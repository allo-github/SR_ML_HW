let net;
const img_output=document.getElementById('img-output');

//the onchange property of the "file" input element is set to loadFile
//Sets the img_output element's src attribute to...
//the URL interface is used to parse, construct, normalize, and encode URLs.
//Event.target is a reference to the target to which the event was originally dispatched.
function loadFile(event){
    img_output.src = URL.createObjectURL(event.target.files[0]);
}

async function classifyImg(){
    console.log("Classifying...");

    const result = await net.classify(img_output);
    console.log("Classification complete.");

    document.getElementById('answer').innerText = `
      Prediction(s): \n${result[0].className}\n
      Probability: \n${result[0].probability}\n
    `
}

async function app(){
    console.log('Loading MobileNet...');

    //Load the model.
    net=await mobilenet.load();
    console.log('Successfully loaded MobileNet');

    //Make a prediction through the model on our image.
    document.getElementById('classify').addEventListener("click",classifyImg);
}

app();
