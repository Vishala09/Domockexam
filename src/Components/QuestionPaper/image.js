function arrayBufferToBase64(buffer) {
    buffer=buffer?.data;
    if(buffer)
    {
        let TYPED_ARRAY = new Uint8Array(buffer);
        const STRING_CHAR = TYPED_ARRAY.reduce((data,byte)=> {
            return data + String.fromCharCode(byte);
        },'');
        let str = 'data:image/png;base64';
        return str+window.btoa(STRING_CHAR);
    }
    else return '';
}