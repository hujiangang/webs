"""管理密码输入校验，错误文本不包含密码原值。"""

from pydantic import BaseModel, ConfigDict, Field, model_validator


class AdminPassword(BaseModel):
    model_config = ConfigDict(hide_input_in_errors=True)

    password: str = Field(min_length=12, max_length=128)


class AdminPasswordChange(BaseModel):
    model_config = ConfigDict(hide_input_in_errors=True)

    current_password: str = Field(min_length=1, max_length=128)
    new_password: str = Field(min_length=12, max_length=128)
    confirm_password: str = Field(min_length=12, max_length=128)

    @model_validator(mode='after')
    def check_confirmation(self):
        if self.new_password != self.confirm_password:
            raise ValueError('两次输入的新密码不一致')
        return self
