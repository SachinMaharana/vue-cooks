new Vue({
  el: "#app",
  data: {
    bottom: false,
    words: []
  },
  watch: {
    bottom(bottom) {
      console.log("in watch bottom");
      if (bottom) {
        this.addWord();
      }
    }
  },
  methods: {
    bottomVisible() {
      const visibleHeight = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const scrolled = window.scrollY;
      const reachedBottom = visibleHeight + scrolled >= pageHeight;
      console.log(visibleHeight, pageHeight, scrolled, reachedBottom);
      return reachedBottom || pageHeight < visibleHeight;
    },
    addWord() {
      axios
        .get(
          "http://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=0&minLength=5&maxLength=15&limit=1&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"
        )
        .then(res => {
          this.words.push(res.data["0"].word);
          if (this.bottomVisible()) {
            this.addWord();
          }
        });
    }
  },
  created() {
    console.log("created");
    window.addEventListener("scroll", () => {
      console.log("scroll added");
      this.bottom = this.bottomVisible();
    });
    this.addWord();
  }
});
