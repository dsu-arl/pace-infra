from flask import Blueprint, render_template
from CTFd.utils.decorators import admins_only

docker = Blueprint("docker", __name__)

@docker.get("/admin/docker")
@admins_only
def view_admin_docker():
    return render_template("admin_docker.html")

