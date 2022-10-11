/*package road.trip.api.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import road.trip.api.persistence.Rating;
import road.trip.api.persistence.RatingRepository;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.hamcrest.Matchers.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class OldRatingControllerTest {
    @Autowired
    MockMvc mockMvc;
    @Autowired
    ObjectMapper mapper;

    @MockBean
    private RatingRepository ratingRepository;

    Rating RATING_1 = new Rating(1L, 5, 3, "Wife and kids had a fantastic time, the app made it so much easier to navigate the trip!");
    Rating RATING_2 = new Rating(2L, 3, 2, "App was a bit slow in areas with little to no cell service");
    Rating RATING_3 = new Rating(3L, 4, 5, "This stop was awesome, it was in an inlet only 2 miles from our route!");

    @Test
    public void getAllRatings_success() throws Exception {
        List<Rating> ratings = new ArrayList<>(Arrays.asList(RATING_1, RATING_2, RATING_3));

        Mockito.when(ratingRepository.findAll()).thenReturn(ratings);

        mockMvc.perform(MockMvcRequestBuilders.get("/rating/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(3)))
                .andExpect(jsonPath("$[2].score", is(4)));
    }

    @Test
    public void addRating_success() throws Exception {
        Rating rating = Rating.builder()
                .id(1l)
                .score(5)
                .message("The app made it so easy to navigate!")
                .build();

        Mockito.when(ratingRepository.save(rating)).thenReturn(rating);

        MockHttpServletRequestBuilder mockRequest = MockMvcRequestBuilders.post("/rating/add")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .content(this.mapper.writeValueAsString(rating));

        mockMvc.perform(mockRequest)
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", notNullValue()))
                .andExpect(jsonPath("$.score", is(5)));
    }
}

 */
