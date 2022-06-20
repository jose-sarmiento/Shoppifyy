import bcrypt from "bcryptjs";

const users = [
  {
    email: "john@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    name: {
      firstname: "john",
      lastname: "doe",
    },
    phone: "1-570-236-7033",
  },
  {
    isAdmin: true,
    email: "morrison@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    name: {
      firstname: "david",
      lastname: "morrison",
    },
    phone: "1-570-236-7033",
  },
  {
    email: "kevin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    name: {
      firstname: "kevin",
      lastname: "ryan",
    },
    phone: "1-567-094-1345",
  },
  {
    email: "don@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    name: {
      firstname: "don",
      lastname: "romer",
    },
    phone: "1-765-789-6734",
  },
  {
    email: "derek@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    name: {
      firstname: "derek",
      lastname: "powell",
    },
    phone: "1-956-001-1945",
  },
  {
    email: "david_r@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    name: {
      firstname: "david",
      lastname: "russell",
    },
    phone: "1-678-345-9856",
  },
  {
    email: "miriam@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    name: {
      firstname: "miriam",
      lastname: "snyder",
    },
    phone: "1-123-943-0563",
  },
  {
    email: "william@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    name: {
      firstname: "william",
      lastname: "hopkins",
    },
    phone: "1-478-001-0890",
  },
  {
    email: "kate@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    name: {
      firstname: "kate",
      lastname: "hale",
    },
    phone: "1-678-456-1934",
  },
  {
    email: "jimmie@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    name: {
      firstname: "jimmie",
      lastname: "klein",
    },
    phone: "1-104-001-4567",
  },
];

export default users;
