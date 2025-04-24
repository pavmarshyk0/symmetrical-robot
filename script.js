const translations = {
    uk: {
      title: "Таємна кімната",
      mainText: "Набір в Таємну кімнату\nПопробуй поміняти щось...",
      buttonText: "Для заповнення форми натисни Пробіл",
      formTitle: "Заповни форму",
      formSubtitle: "і якщо ти нам підходиш, ми напишемо до тебе перші.",
      nameLabel: "Імʼя",
      telegramLabel: "Нік в Телеграм",
      skillsLabel: "Напиши списком свої навички (любі існуючі)",
      aboutLabel: "Напиши про себе декілька слів",
      yearLabel: "Рік народження",
      submitBtn: "Відправити форму",
      successAlert: "Форма успішно відправлена!",
      errorAlert: "Помилка відправки. Дані збережено локально.",
      placeholders: {
        name: "Введіть ваше ім'я",
        telegram: "@username",
        skills: "Наприклад: Графічний дизайн, HTML/CSS, Англійська B2 (не менше 7)",
        about: "Розкажи коротко про свої цілі та інтереси навіщо тобі наше ком'юніті",
        year: "1990"
      }
    },
    en: {
      title: "Secret Room",
      mainText: "Recruitment to the Secret Room\nTry to change something...",
      buttonText: "Press Space to fill the form",
      formTitle: "Fill the Form",
      formSubtitle: "and if you fit us, we'll contact you first.",
      nameLabel: "Name",
      telegramLabel: "Telegram Nickname",
      skillsLabel: "List your skills (any existing)",
      aboutLabel: "Tell us about yourself",
      yearLabel: "Year of birth",
      submitBtn: "Submit Form",
      successAlert: "Form submitted successfully!",
      errorAlert: "Submission error. Data saved locally.",
      placeholders: {
        name: "Enter your name",
        telegram: "@username",
        skills: "Example: Graphic design, HTML/CSS, English B2 (at least 7)",
        about: "Tell us briefly about your goals and why you need our community",
        year: "1990"
      }
    },
    ru: {
      title: "Тайная комната",
      mainText: "Набор в Тайную комнату\nПопробуй что-то изменить...",
      buttonText: "Нажми Пробел для заполнения формы",
      formTitle: "Заполни форму",
      formSubtitle: "и если ты нам подходишь, мы напишем тебе первыми.",
      nameLabel: "Имя",
      telegramLabel: "Ник в Телеграм",
      skillsLabel: "Напиши список своих навыков (любые существующие)",
      aboutLabel: "Напиши несколько слов о себе",
      yearLabel: "Год рождения",
      submitBtn: "Отправить форму",
      successAlert: "Форма успешно отправлена!",
      errorAlert: "Ошибка отправки. Данные сохранены локально.",
      placeholders: {
        name: "Введите ваше имя",
        telegram: "@username",
        skills: "Например: Графический дизайн, HTML/CSS, Английский B2 (не менее 7)",
        about: "Расскажи кратко о своих целях и зачем тебе наше сообщество",
        year: "1990"
      }
    }
  };
  
  function setLanguage(lang) {
    const t = translations[lang];
    
    document.title = t.title;
    document.getElementById('flickeryText').textContent = t.mainText;
    document.getElementById('formButton').textContent = t.buttonText;
    document.getElementById('formTitle').textContent = t.formTitle;
    document.getElementById('formSubtitle').textContent = t.formSubtitle;
    document.querySelector('.submit-btn').textContent = t.submitBtn;
  
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.dataset.translate;
      if (el.tagName === 'LABEL') {
        el.textContent = t[key];
      } else if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t.placeholders[key];
      }
    });
  
    localStorage.setItem('selectedLang', lang);
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
  }
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });
  
  const savedLang = localStorage.getItem('selectedLang') || 'uk';
  setLanguage(savedLang);
  
  const TEMPLATE_CHARS = '▚▞╳╬░▒▓█▀▄▌▐■►▼◄▲►▼◊○◌◍◎●◐◑◒◓◔◕◖◗◘◙◚◛◜◝◞◟◠◡◢◣◤◥◦◧◨◩◪◫◬◭◮◯';
  let originalText = translations[savedLang].mainText;
  let animationFrame;
  let startTime;
  
  function animateText(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const speed = 50;
    
    const chars = originalText.split('').map((char, idx) => {
      if (progress > idx * speed) return char;
      return TEMPLATE_CHARS[Math.floor(Math.random() * TEMPLATE_CHARS.length)];
    }).join('');
  
    document.getElementById('flickeryText').textContent = chars;
  
    if (progress < originalText.length * speed) {
      animationFrame = requestAnimationFrame(animateText);
    } else {
      document.getElementById('flickeryText').textContent = originalText;
      startTime = null;
    }
  }
  
  async function playTransition() {
    return new Promise(resolve => {
      const overlay = document.getElementById('transitionOverlay');
      const codeEffect = document.getElementById('codeEffect');
      const pressStart = document.getElementById('pressStart');
      
      overlay.style.opacity = '1';
      overlay.style.visibility = 'visible';
  
      // Беремо тільки перші 15 рядків коду для пришвидшення
      const pageCode = document.documentElement.outerHTML
        .split('\n')
        .slice(0, 15)
        .map(line => line.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
  
      let currentLine = 0;
      let currentChar = 0;
      let displayCode = '';
  
      function typeCode() {
        if (currentLine < pageCode.length) {
          if (currentChar < pageCode[currentLine].length) {
            displayCode += pageCode[currentLine][currentChar];
            currentChar++;
          } else {
            displayCode += '\n';
            currentLine++;
            currentChar = 0;
          }
          codeEffect.innerHTML = displayCode + '<span class="cursor">|</span>';
          setTimeout(typeCode, Math.random() * 10 + 5); // Пришвидшено набор
        } else {
          showPressStart();
          resolve(); // Розблоковуємо перехід до форми одразу
        }
      }
  
      function showPressStart() {
        pressStart.style.opacity = '1';
        setTimeout(() => {
          overlay.style.opacity = '0';
          // Приховуємо оверлей швидше
          setTimeout(() => {
            overlay.style.visibility = 'hidden';
            codeEffect.textContent = '';
            pressStart.style.opacity = '0';
          }, 500); // Скорочено затримку
        }, 1000); // Скорочено час показу тексту
      }
  
      typeCode();
    });
  }

  async function toggleForm(show) {
    if (show) {
      await playTransition();
      document.getElementById('welcome').style.display = 'none';
      document.getElementById('formSection').classList.add('active');
    } else {
      document.getElementById('welcome').style.display = 'flex';
      document.getElementById('formSection').classList.remove('active');
    }
  }
  
  document.getElementById('formButton').addEventListener('click', () => {
    toggleForm(true);
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !document.getElementById('formSection').classList.contains('active')) {
      e.preventDefault();
      toggleForm(true);
    }
  });
  
  document.getElementById('applicationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const submission = Object.fromEntries(formData.entries());
    
    // Валідація року
    const yearInput = document.querySelector('input[name="year"]');
    if (yearInput.validity.rangeUnderflow || yearInput.validity.rangeOverflow) {
      alert(translations[localStorage.getItem('selectedLang') || 'uk'].errorAlert);
      return;
    }

    const submissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
    submissions.push(submission);
    localStorage.setItem('formSubmissions', JSON.stringify(submissions));
  
    try {
      const response = await fetch('https://formspree.io/f/mqaqkeyl', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(submission)
      });
  
      if (!response.ok) throw new Error();
      alert(translations[localStorage.getItem('selectedLang') || 'uk'].successAlert);
      toggleForm(false);
      e.target.reset();
    } catch (error) {
      alert(translations[localStorage.getItem('selectedLang') || 'uk'].errorAlert);
    }
  });
  
  animateText(performance.now());