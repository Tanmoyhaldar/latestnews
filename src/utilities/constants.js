export const API_KEY = "c7d6e4f0f0bc4a86befca40b41684062"
export const API_URL = "https://newsapi.org/v2/everything"

export const itemsPerPage = 5;

export const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
}
