/**
 * Created by anatolius on 05/06/2017.
 */


function changeColorMarkup() {
  var callCCWrapBtnIcon = document.createElement('i');
  callCCWrapBtnIcon.className = 'large material-icons';
  callCCWrapBtnIcon.innerText = 'mode_edit';
  var callCCWrapBtn = document.createElement('a');
  callCCWrapBtn.className = 'btn-floating btn-large red';
  callCCWrapBtn.appendChild(callCCWrapBtnIcon);


  for (var i = 0; i < backgroundColors.length; i ++) {
    var colorsMarkupListElm = document.createElement('li');
    colorsMarkupListElm.setAttribute("style", "background-color: " + backgroundColors[i].cardColor);
    var colorsMarkupList = document.createElement('ul');
    colorsMarkupList.appendChild(colorsMarkupListElm);
    console.log(colorsMarkupListElm);
  }


  changeColorWrap.className = 'fixed-action-btn toolbar';
  changeColorWrap.appendChild(callCCWrapBtn);
  changeColorWrap.appendChild(colorsMarkupList);
}
changeColorMarkup();