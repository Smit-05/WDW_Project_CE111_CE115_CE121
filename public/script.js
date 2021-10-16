const host = "http://localhost:5000/";
        document.querySelector("#get-video-info-btn").addEventListener("click", function () {
            let videoURL = document.querySelector("#videoURL").value.trim();
            if(videoURL.length == 0){
                alert("Please enter youtube video link");
                return;
            }
            fetch(host+"videoInfo?videoURL="+ videoURL).then(function(response){
                return response.json();
            }).then(function(data){
                console.log(data);
                let detailsNodes = {
                    thumbnail:document.querySelector(".video-data .thumbnail img"),
                    title:document.querySelector(".video-data .info h2"),
                    description:document.querySelector(".video-data .info p"),
                    videoURL:document.querySelector(".video-data .controls #video-url"),
                    downloadOptions:document.querySelector(".video-data .controls #download-option")
                }

                let html = "";
                for(let i=0;i<data.formats.length;i++){
                    if(data.formats[i].container != "mp4"){
                        continue;
                    }
                    html +=`
                        <option value="${data.formats[i].itag}">
                            ${data.formats[i].container} ~ ${data.formats[i].qualityLabel} 
                        </option>
                    `;
                    detailsNodes.thumbnail.src = data.videoDetails.thumbnails[data.videoDetails.thumbnails.length - 1].url;
                    detailsNodes.title.innerText = data.videoDetails.title;
                    detailsNodes.description.innerText = data.videoDetails.description;

                    detailsNodes.videoURL.value = videoURL;
                    detailsNodes.downloadOptions.innerHTML = html;
                    
                    document.querySelector(".video-data").style.display = "block";
                    document.querySelector(".video-data").scrollIntoView({
                        behavior:"smooth"
                    });
                }

            }).catch(function(error){
                alert("Something went wrong!");
            })
        });

        document.querySelector("#download-btn").addEventListener("click",function(){
            let videoURL = document.querySelector("#video-url").value;
            let itag = document.querySelector("#download-option").value;
            window.open(host + "download?videoURL="+videoURL+"&itag="+itag);
        });