import QRCode from 'qrcode'
export function generateQRCode(id: string, url: string, width = 100) {
  const ele = document.getElementById(id) as HTMLCanvasElement
  return QRCode.toCanvas(ele, url, { width })
}