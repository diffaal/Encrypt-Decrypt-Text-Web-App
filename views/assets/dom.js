alg_enc = document.querySelector('.alg-enc');
alg_dec = document.querySelector('.alg-dec');
input_key_enc = document.querySelector('.input-key-enc');
input_key_dec = document.querySelector('.input-key-dec');

alg_enc.addEventListener('click', dispEncKeyInput);
alg_dec.addEventListener('click', dispDecKeyInput);

function dispEncKeyInput(){
    if(alg_enc.selectedIndex == 0){
        input_key_enc.innerHTML = '<label for="id">Public Key Sender</label><input type="file" id="key" name="rsa_pbk">'
    }
    else if(alg_enc.selectedIndex == 1){
        input_key_enc.innerHTML = '<label for="id">Shared Secret Key</label><input type="file" id="key" name="ecc_ssk">'
    }
}

function dispDecKeyInput(){
    if(alg_dec.selectedIndex == 0){
        input_key_dec.innerHTML = '<label for="id">Private Key Reciever</label><input type="file" id="key" name="rsa_pvk">'
    }
    else if(alg_dec.selectedIndex == 1){
        input_key_dec.innerHTML = '<label for="id">Shared Secret Key</label><input type="file" id="key" name="ecc_ssk">'
    }
}



