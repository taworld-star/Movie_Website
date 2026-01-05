# Gunakan Nginx sebagai base image
FROM nginx:alpine

# Salin semua file website ke direktori Nginx
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY app.js /usr/share/nginx/html/
COPY apiTransaction.js /usr/share/nginx/html/

# Copy logo jika ada
COPY logo.png /usr/share/nginx/html/ 2>/dev/null || :

# Expose port 80
EXPOSE 80

# Nginx akan otomatis berjalan ketika container dimulai
CMD ["nginx", "-g", "daemon off;"]