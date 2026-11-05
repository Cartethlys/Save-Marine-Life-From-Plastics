const tabs = document.querySelectorAll('.tab');
const pages = document.querySelectorAll('.page');

function showPage(id) {
  pages.forEach(p => p.classList.toggle('active', p.id === id));
  tabs.forEach(t => t.classList.toggle('active', t.dataset.page === id));
  window.scrollTo({ top: 0 });
  updateBackground();
}

tabs.forEach(tab => tab.addEventListener('click', () => showPage(tab.dataset.page)));
document.querySelectorAll('[data-goto]').forEach(btn =>
  btn.addEventListener('click', () => showPage(btn.dataset.goto))
);

const checkboxes = document.querySelectorAll('#pledge-list input[type="checkbox"]');
const pledgeCount = document.getElementById('pledge-count');

function updatePledgeCount() {
  const checked = document.querySelectorAll('#pledge-list input:checked').length;
  pledgeCount.textContent = `Actions chosen: ${checked} of ${checkboxes.length}`;
}

checkboxes.forEach(cb => cb.addEventListener('change', updatePledgeCount));

const questions = [
  {
    question: 'Why are sea turtles at risk from plastic bags?',
    options: [
      'They use bags as shelter',
      'They mistake bags for jellyfish and eat them',
      'Bags make the water warmer'
    ],
    answer: 1,
    explanation: 'Floating plastic bags can look like jellyfish, which are a natural food for turtles.'
  },
  {
    question: 'Which is a good way to reduce plastic waste?',
    options: [
      'Use single-use plastic cutlery',
      'Throw trash into rivers',
      'Bring a reusable bag when shopping'
    ],
    answer: 2,
    explanation: 'A reusable bag replaces many single-use plastic bags.'
  },
  {
    question: 'What are microplastics?',
    options: [
      'Very small pieces of plastic that can enter the food chain',
      'A type of fish that eats plastic',
      'Plastic bottles used only at sea'
    ],
    answer: 0,
    explanation: 'Microplastics are tiny plastic particles. Small organisms eat them, and they move up the food chain.'
  },
  {
    question: 'What is a ghost net?',
    options: [
      'A net used by fishers to catch fish near the coast',
      'A fishing net that is lost or abandoned in the sea',
      'A net made from recycled plastic bottles'
    ],
    answer: 1,
    explanation: 'Ghost nets keep trapping sea animals for years after they are lost or abandoned.'
  },
  {
    question: 'What is one of the main ways plastic reaches the ocean?',
    options: [
      'Rain falling directly on the sea',
      'Litter carried by rivers from land',
      'Plastic made by fish'
    ],
    answer: 1,
    explanation: 'Rivers carry trash from towns and farms down to the coast and out to sea.'
  },
  {
    question: 'Why does plastic stay in the environment for so long?',
    options: [
      'It dissolves in cold water within a day',
      'It is eaten by bacteria in a few weeks',
      'It breaks into smaller pieces but does not fully biodegrade'
    ],
    answer: 2,
    explanation: 'Sunlight and waves break plastic into smaller pieces, but most plastic does not fully biodegrade.'
  },
  {
    question: 'What is a river trash trap?',
    options: [
      'A net that catches fish for food',
      'A barrier that catches floating rubbish before it reaches the sea',
      'A machine that burns plastic on the riverbank'
    ],
    answer: 1,
    explanation: 'River trash traps catch floating rubbish so it does not reach the ocean.'
  },
  {
    question: 'Which animal is harmed when it swallows bottle caps and lighters?',
    options: [
      'Seabirds',
      'Oak trees',
      'Earthworms'
    ],
    answer: 0,
    explanation: 'Seabirds often swallow plastic items, which can fill their stomachs and stop them eating real food.'
  },
  {
    question: 'Which action tackles plastic pollution at its source?',
    options: [
      'Reducing the production and use of single-use plastic',
      'Burying plastic in the ground',
      'Dropping plastic in a drain during heavy rain'
    ],
    answer: 0,
    explanation: 'Reducing single-use plastic stops much of it from being made and used in the first place.'
  }
];

let currentQ = 0;
let score = 0;
let answered = false;

const questionText = document.getElementById('question-text');
const optionsDiv = document.getElementById('options');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const quizResult = document.getElementById('quiz-result');

function showQuestion() {
  answered = false;
  const q = questions[currentQ];
  questionText.textContent = `Question ${currentQ + 1} of ${questions.length}: ${q.question}`;
  feedback.textContent = '';
  nextBtn.classList.add('hidden');
  optionsDiv.innerHTML = '';

  q.options.forEach((text, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = text;
    btn.addEventListener('click', () => chooseAnswer(index, btn));
    optionsDiv.appendChild(btn);
  });
}

function chooseAnswer(index, button) {
  if (answered) return;
  answered = true;

  const q = questions[currentQ];
  const buttons = optionsDiv.querySelectorAll('.option-btn');

  if (index === q.answer) {
    score++;
    button.classList.add('correct');
    feedback.style.color = '#2e8b57';
    feedback.textContent = 'Correct. ' + q.explanation;
  } else {
    button.classList.add('wrong');
    buttons[q.answer].classList.add('correct');
    feedback.style.color = '#c0392b';
    feedback.textContent = 'Incorrect. ' + q.explanation;
  }

  nextBtn.classList.remove('hidden');
  nextBtn.textContent = currentQ < questions.length - 1 ? 'Next' : 'See score';
}

nextBtn.addEventListener('click', () => {
  currentQ++;
  if (currentQ < questions.length) {
    showQuestion();
  } else {
    questionText.textContent = 'Quiz complete';
    optionsDiv.innerHTML = '';
    feedback.textContent = '';
    nextBtn.classList.add('hidden');
    quizResult.textContent = `Score: ${score} out of ${questions.length}`;
  }
});

showQuestion();

// Build bar charts shown inside the hover info boxes
document.querySelectorAll('.chart').forEach(el => {
  const bars = JSON.parse(el.dataset.bars);
  const max = parseFloat(el.dataset.max);
  const unit = el.dataset.unit || '';

  const title = document.createElement('div');
  title.className = 'chart-title';
  title.textContent = el.dataset.title;
  el.appendChild(title);

  bars.forEach(([label, value]) => {
    const row = document.createElement('div');
    row.className = 'bar-row';

    const name = document.createElement('span');
    name.textContent = label;

    const track = document.createElement('div');
    track.className = 'bar-track';
    const fill = document.createElement('span');
    fill.className = 'bar-fill';
    fill.style.setProperty('--w', (value / max * 100) + '%');
    track.appendChild(fill);

    const val = document.createElement('span');
    val.className = 'bar-value';
    val.textContent = value + unit;

    row.appendChild(name);
    row.appendChild(track);
    row.appendChild(val);
    el.appendChild(row);
  });
});

// Hover to expand (tap to expand on touch screens)
const touchOnly = window.matchMedia('(hover: none)');

document.querySelectorAll('.more').forEach(box => {
  const parent = box.parentElement;
  parent.classList.add('expandable');
  parent.setAttribute('tabindex', '0');

  if (parent.classList.contains('card')) {
    const hint = document.createElement('span');
    hint.className = 'hint';
    hint.innerHTML = '<span class="h-hover">Hover for more</span><span class="h-tap">Tap for more</span>';
    parent.insertBefore(hint, box);
  }

  parent.addEventListener('click', () => {
    if (touchOnly.matches) parent.classList.toggle('open');
  });
});

// Scroll background: crossfade between ocean depth layers
const fadeLayers = document.querySelectorAll('.bg-layer.fade');
let bgTicking = false;

function updateBackground() {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const y = window.scrollY;
  // Short pages still show a small fade so the effect is visible
  const progress = maxScroll > 300 ? y / maxScroll : Math.min(y / 300, 1);
  const p = Math.max(0, Math.min(1, progress));

  fadeLayers.forEach((layer, i) => {
    const opacity = Math.max(0, Math.min(1, p * 3 - i));
    layer.style.opacity = opacity;
  });
}

window.addEventListener('scroll', () => {
  if (!bgTicking) {
    bgTicking = true;
    requestAnimationFrame(() => {
      updateBackground();
      bgTicking = false;
    });
  }
});
window.addEventListener('resize', updateBackground);
updateBackground();

// ===== FEEDBACK SETTINGS (edit these two lines) =====
// 1. Put your own Gmail address here:
const FEEDBACK_EMAIL = 'lamys.jr.0707@gmail.com';
// 2. Optional: paste your Formspree link here to receive feedback automatically
//    (example: 'https://formspree.io/f/abcdwxyz'). Leave '' to use the email app instead.
const FORM_ENDPOINT = 'https://formspree.io/f/moeeblvk';
// =====================================================

// Feedback form
const fbName = document.getElementById('fb-name');
const fbRating = document.getElementById('fb-rating');
const fbComment = document.getElementById('fb-comment');
const fbError = document.getElementById('feedback-error');
const fbThanks = document.getElementById('feedback-thanks');
const fbText = document.getElementById('feedback-text');
const fbForm = document.querySelector('.feedback-form');

document.getElementById('fb-submit').addEventListener('click', () => {
  fbError.textContent = '';
  if (!fbRating.value) {
    fbError.textContent = 'Please choose a rating.';
    return;
  }
  if (fbComment.value.trim() === '') {
    fbError.textContent = 'Please write a short comment.';
    return;
  }

  const name = fbName.value.trim() || 'Anonymous';
  const ratingLabel = fbRating.options[fbRating.selectedIndex].text;
  fbText.value =
    `Feedback on: Save Marine Life from Plastic\n` +
    `From: ${name}\n` +
    `Rating: ${ratingLabel}\n` +
    `Comment: ${fbComment.value.trim()}`;

  const message = fbText.value;
  const submitBtn = document.getElementById('fb-submit');
  const thanksMsg = document.getElementById('thanks-msg');

  function showThanks(text) {
    thanksMsg.textContent = text;
    fbForm.classList.add('hidden');
    fbThanks.classList.remove('hidden');
  }

  function openEmailApp() {
    const subject = encodeURIComponent('Website feedback: Save Marine Life from Plastic');
    const body = encodeURIComponent(message);
    window.location.href = 'mailto:' + FEEDBACK_EMAIL + '?subject=' + subject + '&body=' + body;
  }

  if (FORM_ENDPOINT) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name: name, rating: ratingLabel, message: fbComment.value.trim() })
    })
      .then(response => {
        if (!response.ok) throw new Error('Send failed');
        showThanks('Your feedback was sent. Thank you.');
      })
      .catch(() => {
        openEmailApp();
        showThanks('Automatic sending failed, so your email app should open with the feedback ready. Press send to finish. If it does not open, copy the text below and email it to ' + FEEDBACK_EMAIL + '.');
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit feedback';
      });
  } else {
    openEmailApp();
    showThanks('Your email app should open with the feedback ready to send. Press send to finish. If it does not open, copy the text below and email it to ' + FEEDBACK_EMAIL + '.');
  }
});

document.getElementById('fb-again').addEventListener('click', () => {
  fbName.value = '';
  fbRating.value = '';
  fbComment.value = '';
  fbError.textContent = '';
  fbThanks.classList.add('hidden');
  fbForm.classList.remove('hidden');
});
