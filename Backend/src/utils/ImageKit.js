import ImageKit from "imagekit"
 console.log(process.env.IMAGEKIT_PUBLIC_KEY)

const imagekit = new ImageKit({
  publicKey: 'public_NAyMEbj+Yg9E5u13TjlkUt6Ht+g=',
  privateKey:"private_/cbQaWqfW0CsUL8uckkXT59j/nU=",
  urlEndpoint:"https://ik.imagekit.io/tvgpu7ejk",
});

export default imagekit
