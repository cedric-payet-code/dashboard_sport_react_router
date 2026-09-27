Windows
    Installer PODMAN

python -m pip install podman-compose

FAIRE un export du chemin podman et podman-compose ???

export PATH="$PATH:/c/Users/galeo/AppData/Local/Programs/Podman" ???

--------------------------------------------------

podman machine init
podman machine start

mkdir app
podman-compose up -d
podman-compose run --rm vite sh
yarn create vite . --template react (commande pour créer sans run)
^C
modification du vite.config.js
yarn add react-router-dom
exit

DÉCOMMENTER CONTAINERFILE

--------------------------------------------------

UTILS
podman compose exec -it react bash