from flask import request
from flask_restx import Namespace, Resource
from CTFd.models import db
from CTFd.utils.decorators import authed_only
from CTFd.utils.user import get_current_user

from ...models import UserChallengePreferences

challenge_preferences_namespace = Namespace(
    "chall_pref", description="Endpoint to manage user preferences relating to challenge behavior"
)

@challenge_preferences_namespace.route("")
class ChallengePreferences(Resource):
    @authed_only
    def post(self):
        data = request.get_json()
        user = get_current_user()

        pref_keys = ["stop_on_logout"]
        for key in pref_keys:
            if key not in data:
                return {"success": False, "error": f"Invalid JSON data - {key} not found!"}, 400

        kwargs = {"user_id": user.id, "stop_on_logout": data.get("stop_on_logout", True)}
        user_prefs = UserChallengePreferences(**kwargs)
        db.session.merge(user_prefs)
        db.session.commit()

        return {"success": True}
