export const fetchLetters = async (type, reviewed, region) => {
    const status = reviewed ? 'rev' : 'snrev';
    const url = `http://localhost:3000/api/cartas-${type}/${status}/${region}`;
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Could not fetch the data: ", error);
      return [];
    }
  };

export const reviewLetter = async (id) => {
  const url = `http://localhost:3000/api/cartas-gen/${id}`;
  
  try {
    const response = await fetch(url, {
      method: 'PUT', 
      
    });
    return await response.json(); 
  } catch (error) {
    console.error("Error reviewing the letter: ", error);
  }
};

export const revertLetterReview = async (id) => {
  const url = `http://localhost:3000/api/cartas-gen/${id}`;
  
  try {
    const response = await fetch(url, {
      method: 'PUT', 
      
    });
    return await response.json(); 
  } catch (error) {
    console.error("Error reverting the letter review: ", error);
  }
};