export class Typewriter {
    element: HTMLElement;
    words: string[];
    wait: number;
    isDeleting: boolean;
    txt: string;
    wordIndex: number;
    
    constructor(element: HTMLElement, words: string[], wait = 3000) {
      this.element = element;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = wait;
      this.isDeleting = false;
      this.type();
    }
  
    type() {
      const current = this.wordIndex % this.words.length;
      const fullTxt = this.words[current];
  
      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  
      this.element.innerHTML = `<span class="txt">${this.txt}</span>`;
  
      let typeSpeed = 100;
  
      if (this.isDeleting) {
        typeSpeed /= 2;
      }
  
      if (!this.isDeleting && this.txt === fullTxt) {
        typeSpeed = this.wait;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500;
      }
  
      setTimeout(() => this.type(), typeSpeed);
    }
  }