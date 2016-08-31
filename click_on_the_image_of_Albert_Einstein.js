// ==UserScript==
// @name        click_on_the_image_of_Albert_Einstein
// @namespace   click_on_the_image_of_Albert_Einstein
// @include     http://journals.aps.org.libproxy1.nus.edu.sg/*/pdf/*
// @include     http://journals.aps.org.libproxy1.*.edu/*/pdf/*
// @version     1
// @grant       none
// @run-at document-idle
// ==/UserScript==
function rec_captcha()
{
  var DEBUG_FLAG = true;
  var threshold = 9;
  var section = document.getElementById('title')
  var canvas = document.createElement('canvas');
  var rst_text = document.createElement('h4');
  canvas.setAttribute('width', 200)
  canvas.setAttribute('height', 100)
  canvas.setAttribute('id', 'myCanvas')
  section.appendChild(canvas)
  section.appendChild(rst_text)
  var c = document.getElementById('myCanvas')
  var ctx = c.getContext('2d');
  var idx = 0;
  var captchas = document.getElementsByClassName('captcha');
  for (idx = 0; idx < captchas.length; idx += 1) {
    img = captchas[idx];
    console.log(idx, img.width);
    ratio = (img.width - 100) / 100
    shift = - (img.width - 100)
    ctx.resetTransform()
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.transform(1, 0, ratio, 1, shift, 0);
    ctx.drawImage(img, 0, 0)
    var x,
    y,
    pixels,
    h,
    w;
    d_y = 10;
    d_x = 10;
    h = 100;
    w = 100;
    var tmp_sum = 0;
    imgData = ctx.getImageData(0, 0, w, h);
    rect_x = [
      4,
      89,
      36,
      73
    ];
    rect_y = [
      4,
      10,
      78,
      80
    ];
    rect_w = [
      4,
      5,
      5,
      5
    ];
    rect_h = [
      4,
      5,
      5,
      5
    ];
    rst = [
    ];
    target = [
      42.786,
      127.857,
      95.491,
      104.771
    ];
    tmp_text = document.createElement('h4');
    captchas[idx].parentElement.parentElement.appendChild(tmp_text);
    var match_flag = 1;
    for (i = 0; i < rect_x.length; i += 1) {
      tmp_sum = 0;
      pixels = 0;
      for (y = rect_y[i]; y < rect_y[i] + rect_h[i]; y += 1)
      {
        for (x = rect_x[i]; x < rect_x[i] + rect_w[i]; x += 1)
        {
          pixels += 1;
          var pos = Math.round((y * w + x) * 4);
          tmp_sum += imgData.data[pos + 0];
        }
      }
      if (DEBUG_FLAG)
      {
        //rst_text.textContent += tmp_sum / pixels + ', ';
        tmp_text.textContent += tmp_sum / pixels + ', ';
      }
      rst.push(tmp_sum / pixels);
      if (Math.abs(tmp_sum / pixels - target[i]) > threshold)
      {
        match_flag = 0; /*break;*/
      }
    }
    if (DEBUG_FLAG)
    {
      tmp_text.textContent += ' ' + match_flag;
      if (match_flag > 0)
      {
        tmp_text = document.createElement('h4');
        captchas[idx].parentElement.parentElement.appendChild(tmp_text)
        tmp_text.textContent += '🎯🎯🎯🎯🎯🎯';
      }
    }
    if (match_flag > 0)
    {
      console.log('Click ', idx);
      captchas[idx].parentNode.click(); // click A E
    } //ctx.putImageData(imgData, 0, 0);

  }
}
function wait_for_captchas_loaded()
{
  var captchas = document.getElementsByClassName('captcha');
  for (idx = 0; idx < captchas.length; idx += 1) {
    if (!captchas[idx].complete)
    {
      setTimeout(wait_for_captchas_loaded, 1000);
      return;
    }
  } //alert('All captchas loaded');

  console.log('All captchas loaded');
  rec_captcha();
}
setTimeout(wait_for_captchas_loaded, 100);
