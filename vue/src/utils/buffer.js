/**
 * Created by felix on 2019/3/26.
 */
/**
 * 获取blob对象的兼容性写法
 * @param buffer
 * @param format
 * @returns {*}
 */
export function getBlob(buffer, format) {
    try {
        return new Blob(buffer, {type: format});
    } catch (e) {
        var bb = new (window.BlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder);
        buffer.forEach(function(buf) {
            bb.append(buf);
        });
        return bb.getBlob(format);
    }
}

