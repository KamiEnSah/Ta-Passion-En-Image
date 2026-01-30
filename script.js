var img_click = "";

document.addEventListener("DOMContentLoaded", function () {
    console.log("Hello World");

    // Importer les données via les fichiers JSON
    Promise.all([
        fetch('./images.json').then(response => response.json()),
        fetch('./photos.json').then(response => response.json())
    ]).then(([meduses, mesPhotos]) => {
        
        console.log(meduses);

        // Première partie : Espèces particulières
        meduses.forEach(function (meduse) {
            console.log("Image : " + meduse.nom);
            
            let nomFormate = meduse.nom.replace(/_/g, ' ');
            
            let nouveauBloc = `
                <div class="img">
                    <h3>${nomFormate}</h3>
                    <img class="image_cliquable" src="./images/${meduse.image}.jpg" alt="${nomFormate}">
                    <p class="description">${meduse.description}</p>
                </div>
            `;
            document.querySelector(".liste-images").innerHTML += nouveauBloc;
        });

        // Deuxième partie : Mes photos
        mesPhotos.forEach(function (photo) {
            console.log("Photo : " + photo.nom);
            
            let nomFormate = photo.nom.replace(/_/g, ' ');
            
            let nouveauBloc = `
                <div class="img">
                    <h3>${nomFormate}</h3>
                    <img class="image_cliquable" src="./images/${photo.image}.jpg" alt="${nomFormate}">
                    <p class="description">${photo.description}</p>
                </div>
            `;
            document.querySelector(".liste-photos").innerHTML += nouveauBloc;
        });

        // Gestion de la popup pour les images existantes
        let popup = document.querySelector(".popup");
        let popupImage = document.querySelector("#popup-image");
        console.log(popup);

        img_click = document.querySelectorAll(".image_cliquable");
        img_click.forEach(function (img_popup) {
            console.log(img_click);
            img_popup.addEventListener("click", function () {
                console.log("clic");
                popupImage.src = img_popup.src;
                popup.classList.remove("popup_invisible");
                popup.classList.add("popup_visible");
            });
        });

        // Détecter le clic sur la popup pour la fermer
        popup.addEventListener("click", function () {
            popup.classList.remove("popup_visible");
            popup.classList.add("popup_invisible");
        });
        
        // Empêcher la fermeture si on clique sur l'image elle-même
        popupImage.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    });

    // Gestion du formulaire
    const champTitre = document.querySelector("#titre");
    const champDescription = document.querySelector("#description");
    const champUrl = document.querySelector("#url");
    const apercuTitre = document.querySelector("#apercu-titre");
    const apercuDescription = document.querySelector("#apercu-description");
    const apercuImage = document.querySelector("#apercu-image");

    // Mise à jour en temps réel de l'aperçu
    champTitre.addEventListener("keyup", function() {
        console.log("Titre: " + champTitre.value);
        apercuTitre.textContent = champTitre.value || "Titre de l'image";
    });

    champDescription.addEventListener("keyup", function() {
        console.log("Description: " + champDescription.value);
        apercuDescription.textContent = champDescription.value || "Description de l'image";
    });

    champUrl.addEventListener("keyup", function() {
        console.log("URL: " + champUrl.value);
        apercuImage.src = champUrl.value;
    });

    const boutonEnvoi = document.querySelector("#bouton-envoi");
    const listeVosImages = document.querySelector(".liste-vos-images");
    const popup = document.querySelector(".popup");
    const popupImage = document.querySelector("#popup-image");

    boutonEnvoi.addEventListener("click", function() {
        console.log("Clic sur le bouton d'ajout");
        
        // Récupérer les valeurs du formulaire
        const titre = champTitre.value.trim();
        const description = champDescription.value.trim();
        const urlImage = champUrl.value.trim();
        
        // Vérifier que tous les champs sont remplis
        if (titre === "" || description === "" || urlImage === "") {
            alert("Veuillez remplir tous les champs avant d'ajouter l'image !");
            return;
        }
        
        // Supprimer le message "Aucune image" s'il existe
        const messageVide = document.querySelector(".message-vide");
        if (messageVide) {
            messageVide.remove();
        }
        
        // Créer le nouveau bloc d'image
        const nouvelleImage = `
            <div class="img">
                <h3>${titre}</h3>
                <img class="image_cliquable" src="${urlImage}" alt="${titre}">
                <p class="description">${description}</p>
            </div>
        `;
        
        // Ajouter l'image à la section "Vos images"
        listeVosImages.innerHTML += nouvelleImage;
        
        // Réactiver la popup pour les nouvelles images ajoutées
        const nouvellesImages = document.querySelectorAll(".liste-vos-images .image_cliquable");
        nouvellesImages.forEach(function(img) {
            img.addEventListener("click", function() {
                popupImage.src = img.src;
                popup.classList.remove("popup_invisible");
                popup.classList.add("popup_visible");
            });
        });
        
        // Réinitialiser le formulaire
        champTitre.value = "";
        champDescription.value = "";
        champUrl.value = "";
        apercuTitre.textContent = "Titre de l'image";
        apercuDescription.textContent = "Description de l'image";
        apercuImage.src = "";
        
        // Message de confirmation
        alert("Votre image a été ajoutée avec succès !");
        
        console.log("Image ajoutée : " + titre);
    });
});