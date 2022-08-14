pragma solidity >=0.4.22 <0.9.0;

contract EHR { 
  struct Record { 
    string cid;
    string fileName; 
    address patientId;
    address doctorId;
    uint256 timeAdded;
  }

  struct Patient {
    address id;
    Record[] records;
  }

  struct Doctor {
    address id;
  }

  mapping (address => Patient) public patients;
  mapping (address => Doctor) public doctors;

  event PatientAdded(address patientId);
  event DoctorAdded(address doctorId);
  event RecordAdded(string cid, address patientId, address doctorId); 

  // modifiers

  modifier senderExists {
    require(doctors[msg.sender].id == msg.sender || patients[msg.sender].id == msg.sender, "Sender does not exist");
    _;
  }

  modifier patientExists(address patientId) {
    require(patients[patientId].id == patientId, "Patient does not exist");
    _;
  }

  modifier senderIsDoctor {
    require(doctors[msg.sender].id == msg.sender, "Sender is not a doctor");
    _;
  }

  // functions

  function addPatient(address _patientId) public senderIsDoctor {
    require(patients[_patientId].id != _patientId, "This patient already exists.");
    patients[_patientId].id = _patientId;

    emit PatientAdded(_patientId);
  }

  function addDoctor() public {
    require(doctors[msg.sender].id != msg.sender, "This doctor already exists.");
    doctors[msg.sender].id = msg.sender;

    emit DoctorAdded(msg.sender);
  }

  function addRecord(string memory _cid, string memory _fileName, address _patientId) public senderIsDoctor patientExists(_patientId) {
    Record memory record = Record(_cid, _fileName, _patientId, msg.sender, block.timestamp);
    patients[_patientId].records.push(record);

    emit RecordAdded(_cid, _patientId, msg.sender);
  } 

  function getRecords(address _patientId) public view senderExists patientExists(_patientId) returns (Record[] memory) {
    return patients[_patientId].records;
  } 

  function getSenderRole() public view returns (string memory) {
    if (doctors[msg.sender].id == msg.sender) {
      return "doctor";
    } else if (patients[msg.sender].id == msg.sender) {
      return "patient";
    } else {
      return "unknown";
    }
  }

  function getPatientExists(address _patientId) public view senderIsDoctor returns (bool) {
    return patients[_patientId].id == _patientId;
  }
} 