"""empty message

<<<<<<<< HEAD:migrations/versions/2b5e02013f9f_.py
Revision ID: 2b5e02013f9f
Revises: 
Create Date: 2024-03-13 09:41:54.472758
========
Revision ID: 04baed50f729
Revises: 
Create Date: 2024-03-10 20:50:57.118759
>>>>>>>> develop:migrations/versions/04baed50f729_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<<< HEAD:migrations/versions/2b5e02013f9f_.py
revision = '2b5e02013f9f'
========
revision = '04baed50f729'
>>>>>>>> develop:migrations/versions/04baed50f729_.py
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
