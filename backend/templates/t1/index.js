const template1 = (pData, aboutme, exData, eData, prData, sdescription, adescription, github, linkedin) => {
    return (
        `
        <!doctype html>
        <html>
            <head>
                <!-- Font Awesome -->
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css">
                <!-- Bootstrap core CSS -->
                <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
                <!-- Material Design Bootstrap -->
                <link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.7.5/css/mdb.min.css" rel="stylesheet">
    
                <style>
                  html{
                      zoom: 0.55;
                  }    
                  .rule{
                    border-bottom: 1px solid black;
                    width:80%;
                  }
                  .mobile{
                    margin-top:-10px;
                  }
                  .email{
                    margin-bottom: 0;    
                  }
                  body{
                    font-family: 'Garamond';
                  }
                </style>
            
            </head>
            <body>
    
            <div class="col-lg-8 mx-auto">
            <br/><br/>
            <div class="row text-center align-items-center justify-content-center">
                <div class="col-lg-6">
                    <h1><b>${pData.name}</b></h1>
                    <p class="lead email"><strong>Email:</strong> ${pData.email}</p>
                    <p class="lead"><strong>Contact:</strong> (+91)${pData.phone}</p>
                    <p class="lead"><strong>LinkedIn:</strong> ${linkedin}</p>
                    <p class="lead"><strong>Github:</strong> ${github}</p>
                </div>    
            </div>

            <div>
                  ${aboutme}
            </div>
          
            <hr/>
            <div class="col-lg-8 mx-auto bg-light">
                  <h3><b>Skills</b></h3>
            </div>
            <div class="col-lg-8 row mx-auto"> 
                  <p class="lead">
                      ${sdescription}
                  </p>
            </div>
    
            
            <div class="col-lg-8 mx-auto bg-light">
                  <h3><b>Experience</b></h3>
            </div>
            ${exData.map((d,i) => {
                 return (
                  `<div class="col-lg-8 mx-auto" key=${i}>
                        <p class="lead">
                              <b>${d.name}, ${d.role}</b> (${d.start} - ${d.current ? "Currently":d.end})
                        </p>
                        <p class="mt-0">${d.description}</p>
                  </div>`
                 ) 
            })}
            
            <div class="col-lg-8 mx-auto bg-light">
                  <h3><b>Projects</b></h3>
            </div>
            ${prData.map((d,i) => {
                  return (
                        `<div class="col-lg-8 mx-auto" key=${i}>
                              <p class="lead">
                                    <b>${d.name}</b>
                              </p>
                              <p class="mt-0">${d.description}</p>
                        </div>`
                  )
            })}

            <div class="col-lg-8 mx-auto bg-light">
                  <h3><b>Education</b></h3>
            </div>
            ${eData.map((d,i) => {
                  return (
                        `<div class="col-lg-8 mx-auto" key=${i}>
                              <p class="lead">
                                    <b>${d.name}, ${d.city}</b> (${d.degree}, ${d.start}-${d.end})
                              </p>
                              <p class="mt-0">${d.description}</p>
                        </div>`  
                  )
            })}
    
            <div class="col-lg-8 mx-auto bg-light">
                  <h3><b>Achievements</b></h3>
            </div>
            <div class="col-lg-8 mx-auto">
                  ${adescription}
            </div>
            
                <!-- JQuery -->
                <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
                <!-- Bootstrap tooltips -->
                <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js"></script>
                <!-- Bootstrap core JavaScript -->
                <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
                <!-- MDB core JavaScript -->
                <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.7.5/js/mdb.min.js"></script>
            </body>
        </html>     
        `
    )
}

module.exports = template1;