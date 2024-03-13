import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Folders = () => {
    const navigate = useNavigate();
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        const url = "/api/v1/folders/index";
        fetch(url)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            throw new Error("Network response was not ok.");
          })
          .then((res) => {
              // Filter out folders that have a parent_id
              const topLevelFolders = res.filter(folder => folder.parent_id === null);
              setFolders(topLevelFolders);
          })
          .catch(() => navigate("/"));
      }, [navigate]);

      const allFolders = folders.map((folder, index) => (
        <div key={index} className="d-flex flex-row justify-content-around align-items-center list-group-item border border-dark my-2">
           <Link to={`/folder/${folder.id}`} className="btn">
                {folder.title}
            </Link>
            <div className="text-muted">
                <span className="">{new Date(folder.created_at).toLocaleDateString()}</span>
                {/* <span className="badge bg-secondary ms-2">{folder.size} items</span> */}
            </div>
        </div>
      ));


      const noFolders = (
        <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
          <h4>
            No projects yet. <Link to="/new_">create one</Link>
          </h4>
        </div>
      );

    return (
        <>
            <div>
                <main className="container">
                    <div className="row">
                        {folders.length > 0 ? allFolders: noFolders}
                    </div>
                
                    <div className="mt-3">
                        <Link to="/" className="btn custom-button">
                            New Folder
                        </Link>
                    </div>
                </main>
            </div>
        </>
    );
};
  
export default Folders;