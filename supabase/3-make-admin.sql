-- Step 3: after you create your account on the website (/account), make it staff.
-- Replace the email with yours, then run.
insert into public.admins (user_id)
select id from auth.users where email = 'your-email@example.com'
on conflict do nothing;
