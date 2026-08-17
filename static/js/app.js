// Récupération de l'identifiant projet transmis par Django
const projectId = JSON.parse(document.getElementById('chat-config').textContent);

// Bouton de sortie rapide (Redirection immédiate ou touche Échap)
function quickExit() {
  window.location.replace('https://www.meteofrance.com');
}

document.getElementById('exitBtn').addEventListener('click', quickExit);
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { quickExit(); }
});

// Ouverture du chat au clic
document.getElementById('openChat').addEventListener('click', function() {
  var chatWidget = window.voiceflow || window.lueurEngine;
  if (chatWidget && chatWidget.chat) {
    chatWidget.chat.open();
  } else {
    var tries = 0;
    var iv = setInterval(function() {
      tries++;
      var instance = window.voiceflow || window.lueurEngine;
      if (instance && instance.chat) {
        instance.chat.open();
        clearInterval(iv);
      } else if (tries > 20) {
        clearInterval(iv);
      }
    }, 150);
  }
});

// Animation du ciel étoilé
(function() {
  var svgNS = "http://www.w3.org/2000/svg";
  var container = document.querySelector('.hero');
  if (container) {
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'stars');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');
    for (var i = 0; i < 40; i++) {
      var c = document.createElementNS(svgNS, 'circle');
      c.setAttribute('cx', Math.random() * 100);
      c.setAttribute('cy', Math.random() * 70);
      c.setAttribute('r', (Math.random() * 0.5 + 0.15).toFixed(2));
      c.setAttribute('fill', '#fff');
      c.setAttribute('opacity', (Math.random() * 0.5 + 0.15).toFixed(2));
      svg.appendChild(c);
    }
    container.prepend(svg);
  }
})();

// Chargement du moteur du chatbot
(function(d, t) {
  var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
  v.onload = function() {
    if (window.voiceflow) {
      window.lueurEngine = window.voiceflow;
      window.lueurEngine.chat.load({
        verify: { projectID: projectId },
        url: 'https://general-runtime.voiceflow.com',
        voice: {
          url: "https://runtime-api.voiceflow.com"
        }
      });
    }
  };
  v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
  v.type = "text/javascript";
  s.parentNode.insertBefore(v, s);
})(document, 'script');