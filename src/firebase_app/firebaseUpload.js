import firebase from "firebase/compat/app";
import "firebase/compat/storage";


const uploadImage = async (imageFile, userId, callback) => {
    
    if( imageFile == null || imageFile == undefined) {
        callback("");
    }

    let metadata = {
        contentType: 'image/*'
    }

    const storageRef = firebase.storage().ref();

    let fileArr = imageFile.name.split(".");
    let fileExtension = fileArr[fileArr.length - 1];
    let fileName = Date.now() + "." + fileExtension;

    try {
        storageRef.child(`images/${userId}/${fileName}`).put(imageFile, metadata)
        .then((snap) => {
            snap.ref.getDownloadURL().then( url => {
                callback(url);
            });
        });  
    } catch (err) {
        console.log(err);
        callback("");
    }
    
}

export default uploadImage;



// uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
//     (snapshot) => {
//         // file uploading..
//         console.log('uploading..');
//     },
//     (err) => {
//         console.log('got error');
//         switch (err.code) {
//             case 'storage/unauthorized':
//                 // User doesn't have permission to access the object
//                 status = 404;
//                 break;
//             case 'storage/unknown':
//                 // Unknown error occurred, inspect error.serverResponse
//                 status = 500;
//                 break;
//         }
//         return {
//             status: status,
//             imageUrl: imageUrl
//         };
//     },
//     () => {
//         uploadTask.snapshot.ref.getDownloadURL().then( url => {
//             console.log(url);   
//             return {
//                 status: 200,
//                 imageUrl: url
//             };
//         })
//     }
// )