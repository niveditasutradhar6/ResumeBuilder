
const List = {
list : [
  {
    id: 1,
    name: "Profile Summary",
    description: "Aspiring Software Engineer and Developer",
    enabled: true,
  },
  {
    id: 2,
    name: "Academic and Cocurricular Achievements",
    description: "Current CGPA - 8.56",
    enabled: true,
  },
  {
    id: 3,
    name: "Summer Internship Experience",
    description: "C/C++, Java, Python, Web Development, DBMS",
    enabled: true,
  },
  {
    id: 4,
    name: "Work Experience",
    description: "Made various Projects on different domains",
    enabled: true,
  },
  {
    id: 5,
    name: "Projects",
    description: "T0-do-list, Amazon-clone, Order Amount prediction",
    enabled: true,
  },
  {
    id: 6,
    name: "Certifications",
    description: "Various Certifications on Web development, SQL, Problem-Solving, etc.",
    enabled: true,
  },
  {
    id: 7,
    name: "Extracurricular",
    description: "Gym, Karate, Movie, Travelling",
    enabled: true,
  },
  {
    id: 8,
    name: "Education",
    description: "class 12 --> 81.4%, Class 10 --> 90%",
    enabled: true,
  }
],
getList: function () {
     return (
        (localStorage.getItem({key:"theList"}) && JSON.parse(localStorage.getItem( {key:"theList"}))) || this.list
    );
},

savelist: (list) => {
        localStorage.setItem("theList", JSON.stringify(list));
    },
};


export default List;

