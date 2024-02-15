// SPDX-License-Identifier: MIT 
pragma solidity >=0.4.22 <0.9.0;



contract EHR { 
  struct Record { 
    string cid;
    string fileName; 
    address patientId;
    address doctorId;
    uint256 timeAdded;
  }

  struct Permission{
    bool access;
    address doctorId;
  }

  address private constant ADMIN = 0xe30e325e0da4338B992999388145566a36D0fe6B;

  struct Patient {
    address id;
    Record[] records;
    Permission[] permissions;
  }

  struct Doctor {
    address id;
  }

  mapping (address => Patient) public patients;
  mapping (address => Doctor) public doctors;

  event PatientAdded(address patientId);
  event DoctorAdded(address doctorId);
  event RecordAdded(string cid, address patientId, address doctorId); 
  event RequestAdded(address patientId);
  event AccessGranted(address doctorId);

  // modifiers

  modifier senderExists {
    require(doctors[msg.sender].id == msg.sender || patients[msg.sender].id == msg.sender, "Sender does not exist");
    _;
  }

  modifier patientExists(address patientId) {
    require(patients[patientId].id == patientId, "Patient does not exist");
    _;
  }

   modifier doctorExists(address doctorId) {
    require(doctors[doctorId].id == doctorId, "Doctor does not exist");
    _;
  }

  modifier senderIsPatient{
    require(patients[msg.sender].id == msg.sender, "Sender is not a patient");
    _;
  }

  modifier senderIsDoctor {
    require(doctors[msg.sender].id == msg.sender, "Sender is not a doctor");
    _;
  }

  modifier checkAccess(address patientId){
    bool access = false;
    for(uint i = 0; i < patients[patientId].permissions.length; i++){
      Permission memory permission = patients[patientId].permissions[i];
      if(permission.doctorId == msg.sender){
        if(permission.access == true){
        access = true;
        break;
      }
      }
    }

    require(access == true, "Access Denied");
    _;
  }

  modifier checkAdmin {
    require(msg.sender == ADMIN, "Sender is not an ADMIN");
    _;
  }



  // functions

  function addPatient(address _patientId) public senderIsDoctor {
    require(patients[_patientId].id != _patientId, "This patient already exists.");
    patients[_patientId].id = _patientId;

    emit PatientAdded(_patientId);
  }

  function addDoctor(address _doctorId) public checkAdmin {
    require(doctors[_doctorId].id != _doctorId, "This doctor already exists.");
    doctors[_doctorId].id = _doctorId;

    emit DoctorAdded(_doctorId);
  }


  function requestAccess(address _patientId) public senderIsDoctor patientExists(_patientId){
    Permission memory permission = Permission(false,msg.sender);
    bool exists = false;
    for(uint i = 0; i < patients[_patientId].permissions.length; i++){
        if(patients[_patientId].permissions[i].doctorId == permission.doctorId){
          exists = true;
          break;
        }
    }
    require(!exists,"request already exists!");
    patients[_patientId].permissions.push(permission);
  

    emit RequestAdded(_patientId);
  }

  function getRequests(address _patientId) public view patientExists(_patientId) returns (Permission[] memory){
    return patients[_patientId].permissions;
  }

  function grantAccess(address _doctorId,bool _access) public senderIsPatient doctorExists(_doctorId){
    for(uint i = 0; i < patients[msg.sender].permissions.length; i++){
      if(patients[msg.sender].permissions[i].doctorId == _doctorId){
        patients[msg.sender].permissions[i].access = _access;
        break;
      }
    }

    emit AccessGranted(_doctorId);
  }

  function verifyAccess(address _patientId,address _doctorId) public view senderIsDoctor patientExists(_patientId) returns (bool){
     bool access = false;
    for(uint i = 0; i < patients[_patientId].permissions.length; i++){
      if(patients[_patientId].permissions[i].doctorId == _doctorId){
        if(patients[_patientId].permissions[i].access == true){
        access = true;
        break;
      }
      }
    }
    return access;
  }

  function addRecord(string memory _cid, string memory _fileName, address _patientId) public senderIsDoctor patientExists(_patientId) checkAccess(_patientId) {
    Record memory record = Record(_cid, _fileName, _patientId, msg.sender, block.timestamp);
    patients[_patientId].records.push(record); 

    emit RecordAdded(_cid, _patientId, msg.sender);
  } 

  function getRecords(address _patientId) public view patientExists(_patientId) returns (Record[] memory) {
    return patients[_patientId].records;
  } 

  function getRecordsDoctor(address _patientId) public view senderIsDoctor patientExists(_patientId) returns (Record[] memory){
    return patients[_patientId].records;
  }

  function getSenderRole() public view returns (string memory) {
    if (doctors[msg.sender].id == msg.sender) {
      return "doctor";
    } else if (patients[msg.sender].id == msg.sender) {
      return "patient";
    } else if (msg.sender == ADMIN){
      return "admin";
    } else {
      return "unknown";
    }
  }

  function getPatientExists(address _patientId) public view senderIsDoctor returns (bool) {
    return patients[_patientId].id == _patientId;
  }
} 
