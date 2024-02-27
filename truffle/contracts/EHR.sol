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

  struct EmergencyAccess{
    address id;
    address patientId;
    string name;
    string relation;
    string contact;
    string location;
    bool isAccess;
  }

  address private constant ADMIN = 0xe30e325e0da4338B992999388145566a36D0fe6B;

  struct Patient {
    address id;
    PatientDetails details;
    Record[] records;
    Permission[] permissions;
    EmergencyAccess[] emergencyAccess;
  }

  struct PatientDetails{
    address id;
    string name;
    uint age;
    string gender;
    string contact;
    string location;
    string cause;
  }

  struct Doctor {
    address id;
    address hospitalId;
    string name;
    string email;
    string contact;
    string work;
  }

  struct Hospital {
    address id;
    string name;
    string contact;
    Doctor[] doctors;
  }


  mapping (address => Patient) public patients;
  mapping (address => Doctor) public doctors;
  mapping (address => Hospital) public hospitals;
  mapping (address => EmergencyAccess) public emergencyPerson;
  mapping (address => PatientDetails) public patientDetails;

  event PatientAdded(address patientId);
  event DoctorAdded(address doctorId);
  event RecordAdded(string cid, address patientId, address doctorId); 
  event RequestAdded(address patientId);
  event AccessGranted(address doctorId);
  event HospitalAdded(address hospitalId);
  event EmergencyAdded(address personId);
  event EmergencyAccessGranted(address doctorId);
  event manageEmergency(address personId);

  // modifiers

  modifier senderExists {
    require(doctors[msg.sender].id == msg.sender || patients[msg.sender].id == msg.sender, "Sender does not exist");
    _;
  }

  modifier patientExists(address patientId) {
    require(patients[patientId].id == patientId, "Patient does not exist");
    _;
  }

  modifier personExists(address personId){
    require(emergencyPerson[personId].id == personId,"Person does not exist");
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

  modifier senderIsEmergencyAccess {
    bool exists = false;
    for(uint i = 0; i < patients[emergencyPerson[msg.sender].patientId].emergencyAccess.length; i++){
      if(patients[emergencyPerson[msg.sender].patientId].emergencyAccess[i].id == msg.sender){
        if(patients[emergencyPerson[msg.sender].patientId].emergencyAccess[i].isAccess == true){
        exists = true;
        break;
      }
      }
    }

    require(exists,"Sender didn't have Emergency Access");
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

  function addPatient(address _patientId,string memory _name,uint _age,string memory _gender,string memory _contact,string memory _location,string memory _cause) public senderIsDoctor {
    require(patients[_patientId].id != _patientId, "This patient already exists.");
    patients[_patientId].id = _patientId;
    patients[_patientId].details.id = _patientId;
    patients[_patientId].details.name = _name;
    patients[_patientId].details.age = _age;
    patients[_patientId].details.gender = _gender;
    patients[_patientId].details.contact = _contact;
    patients[_patientId].details.location = _location;
    patients[_patientId].details.cause = _cause;



    emit PatientAdded(_patientId);
  }

  function addEmergencyAccess(address _personId,string memory _name, string memory _relation,string memory _contact, string memory _location,bool _access) public patientExists(msg.sender) senderIsPatient {
    bool exists = false;
    for(uint i = 0; i < patients[msg.sender].emergencyAccess.length; i++){
      if(patients[msg.sender].emergencyAccess[i].id == _personId){
        if(patients[msg.sender].emergencyAccess[i].isAccess == true){
          exists = true;
          break;
        }
      }
    }
    require(!exists,"person already in the Emergency Access");
    EmergencyAccess memory emergency = EmergencyAccess(_personId,msg.sender,_name,_relation,_contact,_location,_access);
    emergencyPerson[_personId].id = _personId;
    emergencyPerson[_personId].patientId = msg.sender;
    patients[msg.sender].emergencyAccess.push(emergency);

    emit EmergencyAdded(_personId);

  }

  function viewEmergencyAccess() public view patientExists(msg.sender) senderIsPatient returns(EmergencyAccess[] memory){
    return patients[msg.sender].emergencyAccess;
  } 

  function manageEmergencyAccess(address _personId,bool _access) public personExists(_personId) senderIsPatient{
    for(uint i = 0; i < patients[msg.sender].emergencyAccess.length; i++){
      if(patients[msg.sender].emergencyAccess[i].id == _personId){
        patients[msg.sender].emergencyAccess[i].isAccess = _access;
        break;
      }
    }

    emit manageEmergency(_personId);
  } 

  function giveEmergencyAccess(address _doctorId,bool _access) public senderIsEmergencyAccess doctorExists(_doctorId){
    for(uint i = 0; i < patients[emergencyPerson[msg.sender].patientId].permissions.length; i++){
       if(patients[emergencyPerson[msg.sender].patientId].permissions[i].doctorId == _doctorId){
        patients[emergencyPerson[msg.sender].patientId].permissions[i].access = _access;
        break;
      }
    }

    emit EmergencyAccessGranted(_doctorId);
  }

  function getPatient(address _patientId) public view senderIsDoctor patientExists(_patientId) returns (PatientDetails memory){
    PatientDetails memory patient = PatientDetails(patients[_patientId].details.id,patients[_patientId].details.name,patients[_patientId].details.age,patients[_patientId].details.gender,patients[_patientId].details.contact,patients[_patientId].details.location,patients[_patientId].details.cause);
    return patient;
  }

  function addDoctor(address _doctorId,address _hospitalId,string memory _name,string memory _email,string memory _contact,string memory _work) public checkAdmin {
    require(doctors[_doctorId].id != _doctorId, "This doctor already exists.");
    doctors[_doctorId].id = _doctorId;
    require(hospitals[_hospitalId].id == _hospitalId, "Hospital not exists");
    doctors[_doctorId].hospitalId = _hospitalId;
    doctors[_doctorId].name = _name;
    doctors[_doctorId].email = _email;
    doctors[_doctorId].contact = _contact;
    doctors[_doctorId].work = _work;

    bool exists = false;

    for(uint i = 0; i < hospitals[_hospitalId].doctors.length; i++){
      if(hospitals[_hospitalId].doctors[i].id == _doctorId){
        exists = true;
        break;
      }
    }

    require(!exists,"doctor already registered in the hospital");
    Doctor memory doctor = Doctor(_doctorId,_hospitalId,_name,_email,_contact,_work);
    hospitals[_hospitalId].doctors.push(doctor);


    emit DoctorAdded(_doctorId);
  }

   function getDoctor(address _doctorId) public view checkAdmin doctorExists(_doctorId) returns(Doctor memory){
    Doctor memory doctor = Doctor(doctors[_doctorId].id,doctors[_doctorId].hospitalId,doctors[_doctorId].name,doctors[_doctorId].email,doctors[_doctorId].contact,doctors[_doctorId].work);
    return doctor;
  }

  function addHospital(address _hospitalId,string memory _name,string memory _contact) public checkAdmin{
    require(hospitals[_hospitalId].id != _hospitalId,"This Hospital already exists.");
    hospitals[_hospitalId].id = _hospitalId;
    hospitals[_hospitalId].name = _name;
    hospitals[_hospitalId].contact = _contact;

    emit HospitalAdded(_hospitalId);
  }

  function getHospital(address _hospitalId) public view checkAdmin returns(Hospital memory){
    require(hospitals[_hospitalId].id == _hospitalId,"hospital not exists");
    Hospital memory hospital = Hospital(hospitals[_hospitalId].id,hospitals[_hospitalId].name,hospitals[_hospitalId].contact,hospitals[_hospitalId].doctors);
    return hospital;
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

  function getRequests(address _patientId) public view patientExists(_patientId) senderIsPatient returns (Permission[] memory){
    return patients[_patientId].permissions;
  }
  function getPatientIdEmergency() public view senderIsEmergencyAccess returns(address){
    return emergencyPerson[msg.sender].patientId;
  }
  function getRequestsByEmergency(address _patientId) public view patientExists(_patientId) senderIsEmergencyAccess returns (Permission[] memory){
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
    } else if(hospitals[msg.sender].id == msg.sender){
      return "hospital";
    } else if(emergencyPerson[msg.sender].id == msg.sender){
      return "emergencyPerson";
    } else {
      return "unknown";
    }
  }

  function getPatientExists(address _patientId) public view senderIsDoctor returns (bool) {
    return patients[_patientId].id == _patientId;
  }
   function getHospitalExists(address _hospitalId) public view checkAdmin returns (bool) {
    return hospitals[_hospitalId].id == _hospitalId;
  }
   function getDoctorExists(address _doctorId) public view checkAdmin returns (bool) {
    return doctors[_doctorId].id == _doctorId;
  }
} 
