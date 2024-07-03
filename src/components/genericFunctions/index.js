export const formatTime = (givenTime) => {
  
    let newTime = givenTime?.estimatedTime;
    let minutes = givenTime;
    const newHours = Math.floor(newTime / 60);
    const hours = Math.floor(minutes / 60);
    const newRemainingMinutes = newTime % 60;
    const remainingMinutes = minutes % 60;
    return`${ hours ? hours : "0" } h ${ remainingMinutes ? remainingMinutes : "0" } m`
    
  };