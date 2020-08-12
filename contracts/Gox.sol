pragma solidity ^0.5.0;

contract Gox { // Group of X (G7,G8, etc.)

  uint public usersCnt = 0;
  uint public entriesCnt = 0;
  uint public publishersCnt = 0;

  struct User {
    uint id;
    string name;
  }


  struct Publisher {
    uint id;
    string name;
  }

  struct Entry {
    uint id;
    uint uid;
    uint pid;
    string content;
  }

  mapping(uint => User) public users;
  mapping(uint => Entry) public entries;
  mapping(uint => Publisher) public publishers;


  constructor() public {

      createUser(1, 'kobi');
      createUser(2, 'mate');
      createPublisher(1, 'Haifa University');
      createPublisher(2, 'Tel Aviv University');
      createEntry(1, 2, 'CS degree');
      createEntry(2, 1, 'Dog degree');
    
    // for (uint i = 0; i <5; i++) {
    //   uint uid = 1 + i;
    //   string memory uname = 'Kobi';

    //   uint pid = 1 + i;
    //   string memory pname = 'Haifa University';

    //   string memory content = 'Some awsome achievement';

    //   createUser(uid, uname);
    //   createPublisher(pid, pname);
    //   createEntry(uid, pid, content);
    // }

  }


  function createUser(uint _id, string memory _name) public {
    usersCnt ++;
    users[_id] = User(_id, _name);
  }


  function createPublisher(uint _id, string memory _name) public {
    publishersCnt ++;
    publishers[_id] = Publisher(_id, _name);
  }


  function createEntry(uint _uid, uint _pid, string memory _content) public {
    entriesCnt ++;
    entries[entriesCnt] = Entry(entriesCnt, _uid, _pid, _content);
  }



  // function createListing(string memory _subject) public {
  //   listingsCount ++;
  //   listings[listingsCount] = Listing(listingsCount, 13, 5, _subject, 'awsome', '');
  //   // emit TaskCreated(taskCount, _content, false);
  // }

  // event TaskCreated(
  //   uint id,
  //   string content,
  //   bool completed
  // );

  // event TaskCompleted(
  //   uint id,
  //   bool completed
  // );

  // function toggleCompleted(uint _id) public {
  //   Task memory _task = tasks[_id];
  //   _task.completed = !_task.completed;
  //   tasks[_id] = _task;
  //   emit TaskCompleted(_id, _task.completed);
  // }

}
