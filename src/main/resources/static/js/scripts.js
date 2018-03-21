//mapka google z pozycją gabinetu
function initMap() {
    var uluru = {lat: 50.278087, lng: 19.565713};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

//ukrywanie formularzy do dodawania pracowników


