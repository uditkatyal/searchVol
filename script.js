const keywordComp = document.getElementById("keyword");
const selectComp = document.getElementById("results");
const outputComp = document.getElementById("output");
const totalComp = document.getElementById("total");
// console.log(totalComp);
// console.log(outputComp);

// we can get max 50 results only from this api
for (let i = 1; i <= 50; i++) {
  const option = document.createElement("option");
  option.value = i;
  option.text = i;

  selectComp.appendChild(option);
}
const getSearchData = async () => {
  try {
    totalComp.innerHTML = "";
    outputComp.innerHTML = "";
    const keyword = keywordComp.value;
    const apiKey = `AIzaSyAXSn7_hjliBtqqrIOhtooNjSG935qK9-8`;
    const results = selectComp.value;
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=${apiKey}&q=${keyword}&maxResults=${results}`;
    const responses = await axios.get(apiUrl);
    console.log(responses);

    const divEle = document.createElement("div");
    divEle.innerHTML = `<b>Keyword: ${keyword}</b> <br/> <b>Search Volume: ${responses.data.pageInfo.totalResults}</b>`;
    totalComp.appendChild(divEle);

    responses.data.items.forEach((item) => {
      // can style if want
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("itemStyles");

      // just loading image and desc for assignment purpose
      const itemImg = document.createElement("img");
      itemImg.src = item.snippet.thumbnails.high.url;

      const itemDesc = document.createElement("div");
      itemDesc.innerHTML = item.snippet.description;

      itemDiv.appendChild(itemDesc);
      itemDiv.appendChild(itemImg);
      outputComp.appendChild(itemDiv);
    });

    console.log("button clicked");
  } catch (err) {
    console.log(err.message);
  }
};
