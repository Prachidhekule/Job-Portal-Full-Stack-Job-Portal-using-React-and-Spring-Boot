
import React, { useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';

import {
  Box,
  Card,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AllPosts = () => {

  const [query, setQuery] = useState("");
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch all jobs or search jobs
  const fetchPosts = async (searchTerm = "") => {

    setLoading(true);
    setError("");

    try {

      let response;

      if (searchTerm.trim().length > 2) {

        response = await axios.get(
          `http://localhost:8080/jobPosts/keyword/${encodeURIComponent(searchTerm.trim())}`
        );

      } else {

        response = await axios.get(
          'http://localhost:8080/jobPosts'
        );

      }

      setPost(response.data);

    } catch (err) {

      console.error("Error fetching job posts:", err);
      setError("Unable to fetch job posts. Please check your backend.");

    } finally {

      setLoading(false);

    }
  };


  // Load jobs and handle search
  useEffect(() => {

    const delay = setTimeout(() => {
      fetchPosts(query);
    }, 300);

    return () => clearTimeout(delay);

  }, [query]);


  // Handle search input
  const handleSearch = (e) => {
    setQuery(e.target.value);
  };


  // Navigate to Edit page
  const handleEdit = (id) => {

    navigate("/edit", {
      state: { id: id }
    });

  };


  // Delete job post
  const handleDelete = async (id) => {

    try {

      await axios.delete(
        `http://localhost:8080/jobPost/${id}`
      );

      // Update the displayed list
      setPost((previousPosts) =>
        previousPosts.filter((p) => p.postId !== id)
      );

    } catch (err) {

      console.error("Error deleting job:", err);
      setError("Unable to delete the job post.");

    }

  };


  return (

    <Box
      sx={{
        padding: "24px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >

      {/* Search Bar */}

      <Box
        sx={{
          width: "100%",
          marginBottom: "25px",
        }}
      >

        <TextField
          placeholder="Search Jobs..."
          fullWidth
          value={query}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            backgroundColor: "#fff",
            borderRadius: "5px",
          }}
        />

      </Box>


      {/* Loading Message */}

      {loading && (
        <Typography
          align="center"
          sx={{ margin: "20px" }}
        >
          Loading job posts...
        </Typography>
      )}


      {/* Error Message */}

      {error && (
        <Typography
          color="error"
          align="center"
          sx={{ margin: "20px" }}
        >
          {error}
        </Typography>
      )}


      {/* Job Cards */}

      {!loading && !error && post.length > 0 && (

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: "24px",
            alignItems: "stretch",
          }}
        >

          {post.map((p) => (

            <Card
              key={p.postId}
              sx={{
                padding: "24px",
                backgroundColor: "#ADD8E6",
                borderRadius: "10px",
                boxShadow: 3,
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
              }}
            >

              {/* Job Title */}

              <Typography
                variant="h5"
                sx={{
                  fontSize: "26px",
                  fontWeight: 600,
                  marginBottom: "15px",
                  color: "#17212A",
                }}
              >
                {p.postProfile}
              </Typography>


              {/* Job Description */}

              <Typography
                sx={{
                  color: "#585858",
                  marginBottom: "18px",
                  lineHeight: 1.6,
                }}
              >
                Description: {p.postDesc}
              </Typography>


              {/* Experience */}

              <Typography
                variant="h6"
                sx={{
                  marginBottom: "12px",
                }}
              >
                Experience: {p.reqExperience} years
              </Typography>


              {/* Skills */}

              <Typography
                sx={{
                  fontWeight: 600,
                  marginBottom: "8px",
                }}
              >
                Skills:
              </Typography>

              <Box
                sx={{
                  flexGrow: 1,
                }}
              >

                {p.postTechStack?.map((s, i) => (

                  <Typography
                    key={i}
                    sx={{
                      marginBottom: "5px",
                    }}
                  >
                    {s}
                  </Typography>

                ))}

              </Box>


              {/* Edit and Delete Buttons */}

              <Box
                sx={{
                  display: "flex",
                  gap: "18px",
                  marginTop: "20px",
                  alignItems: "center",
                }}
              >

                <DeleteIcon
                  onClick={() => handleDelete(p.postId)}
                  sx={{
                    cursor: "pointer",
                    fontSize: "26px",
                    color: "#17212A",
                    '&:hover': {
                      color: "red",
                    },
                  }}
                />

                <EditIcon
                  onClick={() => handleEdit(p.postId)}
                  sx={{
                    cursor: "pointer",
                    fontSize: "26px",
                    color: "#17212A",
                    '&:hover': {
                      color: "#1976d2",
                    },
                  }}
                />

              </Box>

            </Card>

          ))}

        </Box>

      )}


      {/* No Jobs Found */}

      {!loading && !error && post.length === 0 && (

        <Typography
          align="center"
          sx={{
            marginTop: "40px",
            fontSize: "18px",
            color: "#777",
          }}
        >
          No job posts found.
        </Typography>

      )}

    </Box>

  );

};

export default AllPosts;
