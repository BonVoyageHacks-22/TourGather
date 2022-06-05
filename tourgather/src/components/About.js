import { Paper, Button } from '@mui/material';
import { ChevronLeft } from '@mui/icons-material';

export function About() {
    return (
      <>
        <main>
          <Button
            id="backBtn"
            startIcon={<ChevronLeft />}
            sx={{ color: "#a75aa3", fontFamily: 'Concert One', fontSize: "20px"}}
            onClick={() => window.history.back()}
          >
            Back
          </Button>
          <Paper id="paper" elevation={3}>
            <h2>About TourGather</h2>
            <img width="500" src="tour.png" alt="TourGather"></img>
            <br/>
            <p>TourGather is an app to connect you with local tour guides! With this website, travellers can check the different locations they want to visit and connect with the local guides familiar with those locations!</p> 
            <br/>
            <p>There are many things to do before we go on a trip. We want to visit the best spots and go on a memorable adventure. Itinerary planning can be challenging if this is our first time visiting the place. To get inspiration, we read travel blogs and watch videos online. Sometimes asking a local can give us good suggestions and important things to take note of. 
  
            As such, we’ve decided to create a web app, TourGather, to help us find helpful locals to give us a tour of the destination. 
            </p>
            <hr/>
            <h2>Why "TourGather"?</h2>
            <p>Say "TourGather" really quickly and it should sound like "together"!</p> 
          </Paper>
        </main>
      </>
    );
  }