"""empty message

<<<<<<<< HEAD:migrations/versions/6567ea227d7c_.py
Revision ID: 6567ea227d7c
Revises: 
Create Date: 2024-03-18 11:54:57.193373
========
Revision ID: 958296d16cf2
Revises: 
Create Date: 2024-03-18 11:53:52.829595
>>>>>>>> develop:migrations/versions/958296d16cf2_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<<< HEAD:migrations/versions/6567ea227d7c_.py
revision = '6567ea227d7c'
========
revision = '958296d16cf2'
>>>>>>>> develop:migrations/versions/958296d16cf2_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('user_name', sa.String(length=80), nullable=False),
    sa.Column('last_name', sa.String(length=80), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('favorite_profile',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('profile_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user_properties',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('pet', sa.Enum('Yes', 'No', name='petchoice'), nullable=False),
    sa.Column('gender', sa.Enum('Male', 'Female', name='genderchoices'), nullable=False),
    sa.Column('budget', sa.Integer(), nullable=False),
    sa.Column('find_roomie', sa.Enum('Apartment', 'NoApartment', name='findroomiechoice'), nullable=False),
    sa.Column('text_box', sa.Text(), nullable=False),
    sa.Column('profile_img', sa.String(length=1000), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user_properties')
    op.drop_table('favorite_profile')
    op.drop_table('user')
    # ### end Alembic commands ###
