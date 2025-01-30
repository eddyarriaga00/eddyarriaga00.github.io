document.getElementById('mix-button').addEventListener('click', function () {
    const ingredients = {
      stardust: document.getElementById('stardust').checked,
      rosePetals: document.getElementById('rose-petals').checked,
      giggleEssence: document.getElementById('giggle-essence').checked,
      moonbeamExtract: document.getElementById('moonbeam-extract').checked,
      heartbeatSyrup: document.getElementById('heartbeat-syrup').checked,
      adventureElixir: document.getElementById('adventure-elixir').checked,
      sunshineSparkles: document.getElementById('sunshine-sparkles').checked,
    };
  
    const result = getPotionResult(ingredients);
    document.getElementById('potion-name').textContent = result.name;
    document.getElementById('potion-description').textContent = result.description;
    document.getElementById('personal-message').textContent = result.message;
    document.getElementById('result').classList.remove('hidden');
  });
  
  function getPotionResult(ingredients) {
    if (ingredients.stardust && ingredients.rosePetals && ingredients.heartbeatSyrup) {
      return {
        name: "Brew of True Love",
        description: "This potion is the essence of your love. It’s as strong and magical as the day you first met.",
        message: "You’re my forever love. ❤️",
      };
    } else if (ingredients.giggleEssence && ingredients.sunshineSparkles) {
      return {
        name: "Potion of Eternal Laughter",
        description: "This potion will keep you laughing together forever! Just like the time you [insert funny memory].",
        message: "You always make me smile. 😊",
      };
    } else if (ingredients.adventureElixir && ingredients.moonbeamExtract) {
      return {
        name: "Elixir of Adventure",
        description: "This potion will take you on endless adventures together! Remember when you [insert adventure memory]?",
        message: "Let’s explore the world together. 🌍",
      };
    } else {
      return {
        name: "Mystery Potion",
        description: "This potion is a mystery... just like our love!",
        message: "No matter what, I’ll always love you. 💕",
      };
    }
  }