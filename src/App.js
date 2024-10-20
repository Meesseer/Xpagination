import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage]= useState(10)

  const fetchData = async() =>{
    try{
      const response = await fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members`)
      const result = await response.json();
      console.log(result)
      setData(result)
    }catch(error){
      console.error("failed to fetch data", error)
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstitem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstitem,indexOfLastItem); 

  const totalPages = Math.ceil(data.length/itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((member, index)=>(
            <tr key={member.id}>
              {/* <td>{index + 1}</td> */}
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
