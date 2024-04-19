//SPDX-License-Identifier: MIT

pragma solidity 0.8.19;
pragma abicoder v2;
//Contract to store the filesize and the hash of the file for each user and collect payment if the file size exceeds a limit

contract UploadBackend {

    struct File {
        bool starred;
        uint256 fileSize;
        uint256 createdAt;
        string name;
        string fileHash;
    }

    struct UserSubInfo{
        bool hasUpgraded;
        uint256 upgradeTimestamp;
    }

    address public owner;
    uint256 public upgradePrice;
    uint256 public upgradeDuration;
    uint256 private fileSizeLimit;

    mapping(address => uint256) public userFileSize;
    mapping(address => File[]) public userFiles;
    mapping(address => UserSubInfo) public userSubInfo;

    event FileSizeLimitChanged(uint256 newFileSizeLimit);
    event PaymentReceived(address user, uint256 amount);
    event UpgradePriceChanged(uint256 newPrice);
    event UpgradeDurationChanged(uint256 newDuration);

    constructor(uint256 _fileSizeLimit) {
        owner = msg.sender;
        fileSizeLimit = _fileSizeLimit;
        upgradePrice = 0.005 ether;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function uploadFile(uint256 _fileSize, string memory _name, string memory _fileHash) public {
        require(_fileSize > 0, "File size should be greater than 0");
        if(userFileSize[msg.sender] + _fileSize > fileSizeLimit && !userSubInfo[msg.sender].hasUpgraded){
            revert("File size exceeds limit. Please upgrade your account");
        }

        if(
            userSubInfo[msg.sender].hasUpgraded 
            && userSubInfo[msg.sender].upgradeTimestamp + upgradeDuration < block.timestamp
        ){
            revert("Subscription expired. Please renew your subscription");
        }

        userFileSize[msg.sender] += _fileSize;
        userFiles[msg.sender].push(
            File(false, _fileSize, block.timestamp, _name, _fileHash
        ));
    }

    // Pay for subscription
    function receivePayment() payable public {
        require(msg.value > 0, "Payment should be greater than 0");
        require(msg.value >= upgradePrice, "Payment insufficient");

        (bool success,) = payable(owner).call{value: upgradePrice}("");
        require(success, "Payment failed");

        userSubInfo[msg.sender].hasUpgraded = true;
        userSubInfo[msg.sender].upgradeTimestamp = block.timestamp;
        emit PaymentReceived(msg.sender, upgradePrice);
    }

    function starFile(string memory hash) external {
        for(uint i = 0; i < userFiles[msg.sender].length; i++){
            if(keccak256(abi.encodePacked(userFiles[msg.sender][i].fileHash)) == keccak256(abi.encodePacked(hash))){
                userFiles[msg.sender][i].starred = true;
                break;
            }
        }
    }

    // Set the subscription price
    function changeUpgradePrice(uint256 _newPrice) public onlyOwner {
        upgradePrice = _newPrice;
        emit UpgradePriceChanged(_newPrice);
    }

    // Set how long a subscription lasts
    function changeUpgradeDuration(uint256 _newDuration) public onlyOwner {
        upgradeDuration = _newDuration;
        emit UpgradeDurationChanged(_newDuration);
    }

    // Change the file size limit
    function changeFileSizeLimit(uint256 _newFileSizeLimit) public onlyOwner {
        fileSizeLimit = _newFileSizeLimit;
        emit FileSizeLimitChanged(_newFileSizeLimit);
    }

    function getFileSizeLimit() public view returns(uint256) {
        return fileSizeLimit;
    }

    // Transfer ownership
    function transferOwnership(address _newOwner) public onlyOwner {
        owner = _newOwner;
    }

    receive () external payable {
        receivePayment();
    }
}