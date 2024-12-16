class GoogleGenerativeAI {
    apiKey: string;
    baseUrl: string;
  
    constructor(apiKey: string) {
      this.apiKey = apiKey;
      this.baseUrl = "https://generativelanguage.googleapis.com/v1beta/models";
    }
  
    async generateContent(message: string) {
      const url = `${this.baseUrl}/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
  
      const payload = {
        contents: [
          {
            parts: [{ text: message }], // Correct payload format
          },
        ],
      };
  
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
  
        if (!response.ok) {
          const errorDetails = await response.json();
          throw new Error(`Error: ${errorDetails.error.message}`);
        }
  
        const data = await response.json();
        // Correct access to the response
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response available.";
      } catch (error) {
        console.error("Error fetching response:", error);
        throw error;
      }
    }
  }
  
  export default GoogleGenerativeAI;
  