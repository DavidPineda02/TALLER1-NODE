const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file =>{
    return new Promise((resolve,reject)=>{
        fs.readFile(file,'utf-8',(err,data)=>{
            if(err) reject('I could not find that file');
            resolve(data);
        })
    })
}

const writeFilePro = (file,data)=>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(file,data,err=>{
            if(err) reject('Could not write file');
            resolve('succes')
        })
    })
}

const imagenes = [];
const perros = [];

const get = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    perros.push(data);
    const perro = perros[0].split(',');

    console.log(perro);
    console.log("");

    for (const perroName of perro) {
      const res = await superagent.get(
        `https://dog.ceo/api/breed/${perroName.trim()}/images/random`
      );

      imagenes.push(res.body.message);
    }

    await writeFilePro('dog-ing.txt', imagenes.join('\n'));
    console.log(imagenes);
  } catch (error) {
    console.log(error);
  }
};

get();
