const data = {
    "Anxiety": {
      "q1": {
        "header": " Feeling nervous, anxious, or on edge",
        "values": [
          "Not at all",
          "Several days",
          "More than half the days",
          "Nearly every day"
        ]
      },
      // ... (other questions for Anxiety)
    },
    "depression": {
      "q1": {
        "header": "Little interest or pleasure in doing things",
        "values": [
          "Not at all",
          "Several days",
          "More than half the days",
          "Nearly every day"
        ]
      },
      // ... (other questions for depression)
    }
  };
  
  const dataArray = Object.keys(data).map(key => ({
    type: key,
    questions: Object.keys(data[key]).map(questionKey => ({
      id: questionKey,
      ...data[key][questionKey]
    }))
  }));
  
  console.log(dataArray);
  