  import { houseInspections } from "../data/houseInspections.js"
  import { landInspections } from "../data/land-inspections.js";
  import { customerKYC } from "../data/customerKYC.js";
  
  
$(document).ready(function () {
    
    let currentInspection = 0;

    function loadPage(page) {
      $.ajax({
      url: `./components/${page}.html`,
      method: 'GET',
      dataType: 'html',
      success: (data)=> {   
        $('.main-area').html(data)

        if (page = "interestAndApplication") {
          loadLandInspections()
        }
      },

      error: (xhr, status, error)=> {
        $('.main-area').text(`Error loading information "${page}": ${xhr.status} ${xhr.statusText}`);
      }
    })
    }

    function loadContent(component) {
      $.ajax({
        url: `./components/${component}.html`,
        dataType: "html",
        success: (data)=> {
          $(".offcanvas-container").html(data)
        },
        error: (xhr, status, error)=> {
        $('.offcanvas-container').text(`Error loading content "${component}": ${xhr.status} ${xhr.statusText}`);
      }
      });
    }

    $("section").on("click", ".back", ()=> {
      loadPage("interestAndApplication");
      
    });

    
    $("section").on("click", ".item", ()=> {
      loadPage("inspectionDetails")
    });



    $("section").on("click", ".land-option", function() {
      removePreviousOption(".js-inspection-option");
      loadLandInspections()
      currentInspection = 0;
      
      $(this).addClass("text-primary border-bottom border-primary border-3");
      $(".land-option svg path").attr("fill", "#335CFF")
    

    })

    $("section").on("click", ".house-option", function() {
      removePreviousOption(".js-inspection-option");
      loadHouseInspections()
      currentInspection = 1;

      $(this).addClass("text-primary border-bottom border-primary border-3");
      $(".house-option svg path").attr("fill", "#335CFF")
      

    })

    $(".js-house-details-opt").click(function () {
        removePreviousOption(".js-offcanvas-opt")
        $(this).addClass("fw-medium border-bottom border-primary border-3");

        loadContent("houseDetails")
    })

    $(".js-kyc-details-opt").click(function () {
        removePreviousOption(".js-offcanvas-opt")
        $(this).addClass("fw-medium border-bottom border-primary border-3");
        loadContent("KYCDetails")
    })
  

   

    function removePreviousOption(element) {
      let Options = document.querySelectorAll(element)
      if (element === ".js-inspection-option") {
        let icons = document.querySelectorAll(".js-inspection-option svg path")

        for (let i = 0; i < Options.length; i++) {
          const inspOption = Options[i];
          const icon = icons[i];

          inspOption.classList.remove("text-primary", "border-bottom", "border-primary", "border-3");
          icon.setAttribute("fill", "#5C5C5C");
          // icon.style.fill = "#5C5C5C";
          
        }
      }


      if (element = ".js-offcanvas-opt") {
        Options.forEach(item =>{
          item.classList.remove("fw-medium", "border-bottom", "border-primary", "border-3")
        })
      }
    }

    


    function loadHouseInspections() {
      let totalHTML = "";

     
      houseInspections.forEach((item)=> {
        let itemHTML = `<div class="col-12 col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-12 pointer" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">
            <div class="card bg-secondary border-0" style="--bs-bg-opacity:0.07;">
              <div class="card-body">
                <div class="d-flex justify-content-start align-items-center mb-3 ">
                  <div class="pfp-l bg-success rounded-5"></div>
                </div>

                <div class="d-flex justify-content-between align-items-center">
                  <h3 class=" fs-6 ">${item.inspectionName}</h3>

                 
                </div>

                

                <div class="mb-3">
                  <p class="text-secondary custom-text">${item.inspectionDate}</p>
                </div>



                <div class="d-flex align-items-center justify-content-between">
                    <div class="custom-text-sm">
                      ${item.inspectionLocation}
                    </div>

                    <div class="fw-semibold rounded-4 p-1 px-2 custom-text-sm text-danger bg-danger-subtle">
                      Apartment
                    </div>
                </div>
              </div>
            </div>
        </div>`;


        totalHTML +=itemHTML;
      })

      $(".js-inspection-box").html(totalHTML);
    } 

    



    function loadLandInspections() {
      let totalHTML = "";

      landInspections.forEach(item => {
        let itemHTML= `<div class="col-12 col-xxl-3 col-xl-4 col-lg-4 col-md-6 col-sm-12 pointer item">
  <div class="card bg-secondary border-0" style="--bs-bg-opacity:0.07;">
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-center">
        <h3 class=" fs-6 ">${item.inspectionName}</h3>

        <div class="bg-white rounded-5 p-1 d-flex justify-content-center align-items-center" style="width: 25px; height:25px;">
          <img src="./assets/icons/Vector.svg" alt="" width="13px" height="13px">
        </div>

      </div>

      <div class="mb-3">
        <p class="text-secondary custom-text">${item.inspectionDate}</p>
      </div>


      <div class="bg-white d-flex align-items-center justify-content-between p-1 px-2 rounded-5 w-50 mb-2" >
          <div class="d-flex align-items-center">
            <div class="rounded-5 bg-primary border border-2 border-white pfp d-flex align-items-center justify-content-center text-white" >A</div>
            <div class="rounded-5 bg-primary border border-2 border-white pfp  text-white d-flex align-items-center justify-content-center">B</div>
            <div class="rounded-5 bg-primary border border-2 border-white pfp  text-white d-flex align-items-center justify-content-center">C</div>
          </div>

          <div class="mx-1"> +4</div>
      </div>

      <div class="d-flex align-items-center justify-content-between">
          <div class="custom-text-sm">
            On-site inspection
          </div>

          <div class="fw-semibold rounded-4 p-1 px-2 custom-text-sm text-danger bg-danger-subtle">
            Land
          </div>
      </div>
    </div>
  </div>
</div>`

        totalHTML += itemHTML;
      })

      $(".js-inspection-box").html(totalHTML);
      
    }
    


});


  

