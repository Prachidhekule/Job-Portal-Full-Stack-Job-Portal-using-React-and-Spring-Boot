package com.telusko.spring_boot_rest.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.telusko.spring_boot_rest.model.JobPost;
import java.util.List;
@Repository
public interface JobRepo extends JpaRepository<JobPost, Integer> {
    List<JobPost> findByPostProfileContainingIgnoreCaseOrPostDescContainingIgnoreCase(
            String postProfile, String postDesc
    );

}