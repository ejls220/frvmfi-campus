import qrcode
import os

# GitHub Pages URL to your map.html
url = "https://ejls220.github.io/frvmfi-campus/frvmfi-main"

# Create QR code
qr = qrcode.QRCode(
    version=1,
    box_size=10,
    border=5
)
qr.add_data(url)
qr.make(fit=True)

# Save QR code in the same folder as HTML
img_path = "qrcode.png"
img = qr.make_image(fill="black", back_color="white")
img.save(img_path)


print(f"QR code generated at {img_path}")
