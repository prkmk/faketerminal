var histArray = []; // command history
var histIndex = 0;
const user = "guest";
const domain = "faketerminal";
const greet = "Hello World!";
const madeby = "Made by <a target='_blank' href='https://github.com/prkmk'>prkmk</a>";
const help = "<pre>Fake Terminal         version 1.2.0 (maybe)<br>"
                + "This isn't a real  console,  just something<br>"
                + "I coded for fun on my spare time. Feel free<br>"
                + "to try out the commands  below. Type 'help'<br>"
                + "to see this list.  All  feedback is welcome<br>"
                + "and  follow  me  on  github  if  you  like!<br><br></pre>"

const cat = "<pre>         # <br>          \\<br> /\\/\\_____/<br>>|.. <    |<br>"
          + " |        |<br> |________|<br>  ''    '' </pre>";

var commands = ["clear", "google", "help", "madeby",
                "exit", "cat", "ascii", "greet"].sort();


function restoreFocus() {
  // restores focus to input element if it exists
  if (!(document.getElementById("input") == null))
    document.getElementById("input").focus();
}


function start() {
  // prints greeting and initializes the terminal

  document.getElementsByTagName("body")[0].innerHTML =
    "<div id='terminal' onkeyup='command(event)'>" + greet + "</div>";
	
	document.getElementById("terminal").innerHTML +=
    "<div id='prompt'>" + user + "@" + domain + ":~$ "
    + "<input type='text' id='input' autocomplete='off' autocorrect='off' "
    + "autocapitalize='off' spellcheck='false' autofocus/></div>";
}


function command(event) {
  // runs if a key is pressed

  event.preventDefault();

  // if enter key is pressed
	if (event.keyCode === 13) {

		var line = document.getElementById("input").value;
		document.getElementById("input").outerHTML = "";
		document.getElementById("terminal").lastElementChild.innerHTML +=
			"<span>" + line + "</span>";

		if (!runCommand(line)) return;
		document.getElementById("terminal").innerHTML +=
      "<div id='prompt'>" + user + "@" + domain + ":~$ <input type='text' "
      + "id='input' autocomplete='off' autocorrect='off' autocapitalize='off' "
      + "spellcheck='false' autofocus/></div>"

		// store command to history, update histIndex(length)
		if (line != "") histIndex = histArray.push(line);

		restoreFocus();
  }
  
	// if arrow up key is pressed
	else if (event.keyCode === 38) {
		if (histIndex == 0) return;
		document.getElementById("input").value = histArray[--histIndex];
  }
  // if arrow down key is pressed
	else if (event.keyCode === 40) {
		if (histIndex >= histArray.length - 1) {
			document.getElementById("input").value = "";
			histIndex = histArray.length;
			return;
		}
		document.getElementById("input").value = histArray[++histIndex];
	}
}


function openInNewTab(url) {
  // opens an url in new tab
	window.open(url, '_blank').focus();
}


function runCommand(line) {
  // reads user input and runs the according command

	var input = line.toLowerCase().split(' ');
  var textToShow; // feedback to user
  
	switch (input[0]) {

	case "":
    return true;
    
	case "madeby":
    textToShow = madeby;
    break;

  case "cat":
    textToShow = cat;
    break;

  case "greet":
    textToShow = greet;
    break;
    
	case "google":
		// search from google
		if (input[1] == undefined)
			textToShow = "Usage: google [search word] [search word]...";
		else {
			var googleSearch = "";
			for (var i = 1; i < input.length; i++) {
				googleSearch += input[i];
				if (!(i == input.length - 1))
					googleSearch += " ";
			}
			var url = "http://www.google.com/search?q=" + googleSearch;
      textToShow = "Searching <a target='_blank' href='" + url + "'>"
      + googleSearch + "</a> from Google";
			openInNewTab(url);
		}
    break;
    
  case "ascii":
    // asciify text
    if (input[1] == undefined)
      textToShow = "Usage: ascii [some text]"
    else {
      var text = "";
      for (var i = 1; i < input.length; i++) {
        text += input[i] + " ";
      }
      textToShow = textToAscii(text);
    }
    break;

	case "clear":
		document.getElementById("terminal").innerHTML = "";
		return true;

	case "help":
    textToShow = help;
    for (var i = 0; i < commands.length; i++) {
      textToShow += commands[i];
      if (i < commands.length - 1) textToShow += "<br>";
    }
    break;

  case "exit":
    document.getElementsByTagName("body")[0].innerHTML = "<...>";
    return false;
    
	default:
    textToShow = "Command '" + input[0] + "' not found. "
               + "Type 'help' to see the list of commands.";
	}
	
  document.getElementById("terminal").innerHTML += textToShow;
  return true;
}


function textToAscii(text) {
  // converts text into ascii

  var line1 = "";
  var line2 = "";
  var line3 = "";
  text = text.toLowerCase().split(' ');
  for (var word = 0; word < text.length; word++) {
    for (var i = 0; i < text[word].length; i++) {
      switch (text[word][i]) {
      case 'a':
        line1 += " _ ";
        line2 += "|_|";
        line3 += "| |";
        break;
      case 'b':
        line1 += " _ ";
        line2 += "|_)";
        line3 += "|_)";
        break;
      case 'c':
        line1 += " __";
        line2 += "/  ";
        line3 += "\\__";
        break;
      case 'd':
        line1 += " _ ";
        line2 += "| \\";
        line3 += "|_/";
        break;
      case 'e':
        line1 += " __";
        line2 += "|_ ";
        line3 += "|__";
        break;
      case 'f':
        line1 += " __";
        line2 += "|_ ";
        line3 += "|  ";
        break;
      case 'g':
        line1 += " __";
        line2 += "/__";
        line3 += "\\_|";
        break;
      case 'h':
        line1 += "   ";
        line2 += "|_|";
        line3 += "| |";
        break;
      case 'i':
        line1 += " ";
        line2 += "|";
        line3 += "|";
        break;
      case 'j':
        line1 += "   ";
        line2 += "  |";
        line3 += "\\_|";
        break;
      case 'k':
        line1 += "  ";
        line2 += "|/";
        line3 += "|\\";
        break;
      case 'l':
        line1 += "   ";
        line2 += "|  ";
        line3 += "|__";
        break;
      case 'm':
        line1 += "   ";
        line2 += "|V|";
        line3 += "| |";
        break;
      case 'n':
        line1 += "   ";
        line2 += "|\\|";
        line3 += "| |";
        break;
      case 'o':
        line1 += " _ ";
        line2 += "/ \\";
        line3 += "\\_/";
        break;
      case 'p':
        line1 += " _ ";
        line2 += "|_)";
        line3 += "|  ";
        break;
      case 'q':
        line1 += " _ ";
        line2 += "/ \\";
        line3 += "\\_\\";
        break;
      case 'r':
        line1 += " _ ";
        line2 += "|_)";
        line3 += "| \\";
        break;
      case 's':
        line1 += " __";
        line2 += "(_ ";
        line3 += "__)";
        break;
      case 't':
        line1 += "___";
        line2 += " | ";
        line3 += " | ";
        break;
      case 'u':
        line1 += "   ";
        line2 += "| |";
        line3 += "|_|";
        break;
      case 'v':
        line1 += "    ";
        line2 += "\\  /";
        line3 += " \\/ ";
        break;
      case 'w':
        line1 += "      ";
        line2 += "\\    /";
        line3 += " \\/\\/ ";
        break;
      case 'x':
        line1 += "  ";
        line2 += "\\/";
        line3 += "/\\";
        break;
      case 'y':
        line1 += "   ";
        line2 += "\\_/";
        line3 += " | ";
        break;
      case 'z':
        line1 += "___";
        line2 += " _/";
        line3 += "/__";
        break;
      }
      line1 += " ";
      line2 += " ";
      line3 += " ";
    }
    // space character
    line1 += "   ";
    line2 += "   ";
    line3 += "   ";
  }
  return "<pre>" + line1 + "<br>" + line2 + "<br>" + line3 + "</pre>"
}