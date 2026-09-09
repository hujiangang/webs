import hashlib
import io

import qrcode
from fastapi import APIRouter, HTTPException, Response
from pydantic import BaseModel, Field
from qrcode.exceptions import DataOverflowError


router = APIRouter(tags=["utilities"])


class TextRequest(BaseModel):
    text: str = Field(min_length=1, max_length=100000)


class QrRequest(BaseModel):
    text: str = Field(min_length=1, max_length=1800)


@router.post("/qr")
def create_qr(payload: QrRequest):
    try:
        qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M, box_size=8, border=4)
        qr.add_data(payload.text)
        qr.make(fit=True)
        output = io.BytesIO()
        qr.make_image(fill_color="#111821", back_color="white").save(output, format="PNG")
        return Response(output.getvalue(), media_type="image/png")
    except DataOverflowError as exc:
        raise HTTPException(422, "内容过长，请减少文本后重试") from exc


@router.post("/hash")
def create_hash(payload: TextRequest):
    content = payload.text.encode("utf-8")
    return {
        "MD5": hashlib.md5(content, usedforsecurity=False).hexdigest(),
        "SHA-1": hashlib.sha1(content, usedforsecurity=False).hexdigest(),
        "SHA-256": hashlib.sha256(content).hexdigest(),
    }
