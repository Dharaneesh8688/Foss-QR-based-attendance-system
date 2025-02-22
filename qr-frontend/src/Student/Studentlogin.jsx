import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentSignInPage = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/Students/signin", {
        rollNumber,
        password,
      });

      const { token, studentDetails } = response.data;
      console.log(studentDetails)
      localStorage.setItem("studentToken", token);
      navigate(`/studentlogininfo/${studentDetails._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Error logging in. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-12">
          <div className="card shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Student Sign In</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="rollNumber" className="form-label">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="rollNumber"
                    placeholder="Enter your Roll Number"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Date of Birth (YYYY-MM-DD)
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your Date of Birth"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSignInPage;
