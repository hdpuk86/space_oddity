var Popup = function() {
  var popup = document.getElementById('testPopup');
  var span = document.getElementsByClassName("close-popup")[0];
  var content = document.getElementById('popup-content');

  var setContent = function(newContent) {
    content.innerHTML = newContent;
  };

  var display = function() {
    popup.style.display = 'block';

    span.onclick = () => {
      popup.style.display = 'none';
      setContent('');
    }
    window.onclick = (event) => {
      if (event.target == popup) {
        popup.style.display = 'none';
        setContent('');
      }        
    }
  };

  return {
    setContent,
    display,
  }
};

module.exports = Popup;
